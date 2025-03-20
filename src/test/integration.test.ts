import fs from "node:fs";
import path from "node:path";
import { expect, test, suite, afterAll } from "vitest";
import request from "supertest";
import { DatabaseModel } from "../model/database-model";
import InMemorySqliteDatabase from "../database/in-memory-sqlite.database";
import MovieDataLoader from "../services/movie.data-loader";
import ExpressWebServer from "../web/express.web-server";
import { SqliteQueryStrategy } from "../database/sqlite.query-strategy";
import MovieRepository from "../repository/movie-repository";
import AwardsController from "../controllers/awards-controller";

const config = {
	testCsvPath: "csv/movielist.test.csv",
};

const testDatabase = new InMemorySqliteDatabase();
const testDataLoader = new MovieDataLoader(config.testCsvPath);

suite.sequential("Teste de integração", async () => {

	test("Deve inicializar um banco de dados SQLite em memória", async () => {
		await testDatabase.init();
		expect(testDatabase.database).toBeDefined();
	});

	test("Deve criar a tabela de filmes no banco de dados", async () => {
		await testDatabase.migrate();
		const tableInfo = await testDatabase.query<{
			cid: number;
			name: string;
			type: string;
			notnull: number;
			dflt_value: any;
			pk: number;
		}>("PRAGMA table_info('movies');");
		expect(tableInfo.length).toBe(8);
		const columns = tableInfo.map(row => row.name);
		expect(columns).toMatchObject(["id", "title", "year", "studios", "producers", "winner", "key", "created_at"]);
		const dataTypes = tableInfo.map(row => row.type);
		expect(dataTypes).toMatchObject(["INTEGER", "TEXT", "INTEGER", "TEXT", "TEXT", "INTEGER", "TEXT", "DATETIME"]);
		const notNulls = tableInfo.map(row => row.notnull);
		expect(notNulls).toMatchObject([1, 1, 1, 1, 1, 1, 1, 0]);
	});

	test("Deve encontrar o arquivo CSV", () => {
		expect(fs.existsSync(path.resolve(config.testCsvPath))).toBe(true);
	});

	test("Deve popular no banco de dados o conteúdo do CSV", async () => {
		await testDataLoader.load(testDatabase, "replace");
		const rows = await testDatabase.query<DatabaseModel.Movie>("SELECT * FROM movies;");
		const rowsNumber = fs.readFileSync(path.resolve(config.testCsvPath), "utf-8")
			.split("\n")
			.map(line => line.trim())
			.filter(line => line !== "")
			.length - 1;
		expect(rows.length).toBe(rowsNumber);
	});

	const strategy = {
		movies: new SqliteQueryStrategy.Movies(),
	};
	const repositories = {
		movies: new MovieRepository(testDatabase, strategy.movies),
	};
	const controllers = {
		awards: new AwardsController(repositories.movies)
	};
	const testWebServer = new ExpressWebServer();
	await testWebServer.start(controllers);

	test("Serviço web deve estar rodando", async () => {
		expect(testWebServer.server).toBeDefined();
		const res = await request(testWebServer.server).get("/test");
		expect(res.status).toBe(200);
		expect(res.text).toBe("OK");
	});

	test("Deve retornar os produtores com os menores e maiores intervalo entre prêmios", async () => {
		const res = await request(testWebServer.server).get("/api/v1/awards-interval");
		expect(res.status).toBeOneOf([200, 302]);
		expect(res.body).toBeDefined();
		expect(res.body).toHaveProperty("min");
		expect(res.body).toHaveProperty("max");
		expect(res.body.min).toBeInstanceOf(Array);
		expect(res.body.max).toBeInstanceOf(Array);
		if (res.body.min.length > 0) {
			const elementIsIntervalResult = (element: any) => {
				return element.hasOwnProperty("producer") && typeof element.producer === "string"
					&& element.hasOwnProperty("interval") && typeof element.interval === "number"
					&& element.hasOwnProperty("previousWin") && typeof element.previousWin === "number"
					&& element.hasOwnProperty("followingWin") && typeof element.followingWin === "number";
			};
			const allElementsHaveProperties =
				res.body.min.every(elementIsIntervalResult) &&
				res.body.max.every(elementIsIntervalResult);
			expect(allElementsHaveProperties).toBe(true);
		}
	});

	afterAll(async () => {
		await testDatabase.close();
	});

});
