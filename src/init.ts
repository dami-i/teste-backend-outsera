import type { Database, CsvDataLoader, WebServer } from "./interfaces";
import SqliteDatabase from "./database/sqlite.database";
import MovieDataLoader from "./services/movie.data-loader";
import NodeWebServer from "./web/node.web-server";
import { isMode } from "./services/data-loader";

export const services: ServiceList = {
	database: new SqliteDatabase("database/database.sqlite3"),
	dataLoader: new MovieDataLoader("csv/movielist.csv"),
	webServer: new NodeWebServer(),
};

init(services);

async function init({ database, dataLoader, webServer }: ServiceList) {
	const mode = process.argv[2] ?? "replace";
	if (!isMode(mode)) {
		throw new Error("Modo de carregamento inválido. Deve ser 'replace' ou 'append'.");
	}

	for (const signal of ["SIGINT", "SIGTERM", "SIGQUIT"]) {
		process.on(signal, async (signal) => {
			console.log("Finalizando aplicação com sinal:", signal);
			await database.close();
			process.exit(1);
		});
	}
	process.on("beforeExit", async (code) => {
		console.log("Finalizando aplicação com código:", code);
		await database.close();
	});
	process.on("uncaughtException", async (err) => {
		console.log("Finalizando aplicação com erro:", err.name, err.message);
		await database.close();
		process.exit(1);
	});

	console.log("Inicializando o banco de dados...");
	await database.init();

	console.log("Carregando os dados do CSV no modo:", mode);
	await dataLoader.load(database, mode);

	console.log("Inicializando o servidor web...");
	await webServer.start();
};

type ServiceList = {
	database: Database;
	dataLoader: CsvDataLoader;
	webServer: WebServer;
};
