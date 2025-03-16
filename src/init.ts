import type { Database, CsvDataLoader as CsvDataLoader, WebServer } from "./interfaces";
import SqliteDatabase from "./database/SqliteDatabase";
import MovieDataLoader from "./services/MovieDataLoader";
import NodeWebServer from "./web/NodeWebServer";

const services: ServiceList = {
	database: new SqliteDatabase("database/database.sqlite3"),
	movieDataLoader: new MovieDataLoader("csv/movielist.csv"),
	webServer: new NodeWebServer(),
};

init(services);

// TODO Adicionar flag para adicionar CSV em vez de substituir

async function init({ database, movieDataLoader, webServer }: ServiceList) {
	for (const signal of ["SIGINT", "SIGTERM", "SIGQUIT"]) {
		process.on(signal, async (signal) => {
			console.log("Finalizando aplicação com sinal:", signal);
			await database.unlock();
			process.exit(1);
		});
	}
	process.on("beforeExit", async (code) => {
		console.log("Finalizando aplicação com código:", code);
		await database.unlock();
	});
	process.on("uncaughtException", async (err) => {
		console.log("Finalizando aplicação com erro:", err.name, err.message);
		await database.unlock();
		process.exit(1);
	});

	console.log("Inicializando o banco de dados...");
	await database.setup();

	console.log("Carregando os dados do CSV...");
	await movieDataLoader.startupLoad(database);

	console.log("Inicializando o servidor web...");
	await webServer.start();
};

type ServiceList = {
	database: Database;
	movieDataLoader: CsvDataLoader;
	webServer: WebServer;
};
