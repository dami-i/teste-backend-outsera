import fs from "node:fs";
import path from "node:path";
import { expect, test, beforeAll, afterAll, suite } from "vitest";
import request from "supertest";
import SqliteDatabase from "../database/sqlite.database";
import { DatabaseModel } from "../model/database-model";
import MovieDataLoader from "../services/movie.data-loader";
import app from "../web/app";

const config = {
	databasePath: "data/database.test.sqlite3",
	csvPath: "csv/movielist.test.csv",
};

const database = new SqliteDatabase(config.databasePath);
const dataLoader = new MovieDataLoader(config.csvPath);

beforeAll(() => {
	if (fs.existsSync(path.resolve(config.databasePath))) {
		fs.unlinkSync(path.resolve(config.databasePath));
	}
});

suite.sequential("Teste de integração", () => {

	suite.sequential("Na inicialização", async () => {

		test("Não deve haver arquivo de banco de dados", () => {
			expect(fs.existsSync(path.resolve(config.databasePath))).toBe(false);
		});

		test("Deve criar um arquivo de banco de dados SQLite", async () => {
			await database.init();
			expect(fs.existsSync(path.resolve(config.databasePath))).toBe(true);
		});

		test("Deve criar a tabela de filmes no banco de dados", async () => {
			await database.migrate();

			const tableInfo = await database.query<{
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
			expect(fs.existsSync(path.resolve(config.csvPath))).toBe(true);
		});

		test("Deve popular no banco de dados o conteúdo do CSV", async () => {
			await dataLoader.load(database, "replace");

			const rows = await database.query<DatabaseModel.Movie>("SELECT * FROM movies;");
			expect(rows.length).toBe(83);

			const yearSum = rows.reduce((sum, row) => sum + row.year, 0);
			expect(yearSum).toBe(165947);
		});

	});

	suite("Teste de endpoints", async () => {

		// FIX Receber a instância do banco de dados no controller
		test("Deve retornar os produtores com os menores e maiores intervalo entre prêmios", async () => {
			request(app).get("/api/v1/awards-interval").then(res => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toBeInstanceOf(Array);
				expect(res.body.length).toBe(2);
			});
		});

	});

});

afterAll(async () => {
	await database.close();
	if (fs.existsSync(path.resolve(config.databasePath))) {
		fs.unlinkSync(path.resolve(config.databasePath));
	}
});