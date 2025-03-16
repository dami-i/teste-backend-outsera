import type { Database, CsvDataLoader, WebServer } from "./interfaces";
import SqliteDatabase from "./database/SqliteDatabase";
import MovieDataLoader from "./services/MovieDataLoader";
import NodeWebServer from "./web/NodeWebServer";
import { isMode } from "./services/CsvDataLoader";

const services: ServiceList = {
	database: new SqliteDatabase("database/database.sqlite3"),
	movieDataLoader: new MovieDataLoader("csv/movielist.csv"),
	webServer: new NodeWebServer(),
};

init(services);

async function init({ database, movieDataLoader, webServer }: ServiceList) {
	const mode = process.argv[2];
	if (!isMode(mode)) {
		throw new Error("Modo de carregamento inválido. Deve ser 'replace' ou 'append'.");
	}
	
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

	console.log("Carregando os dados do CSV no modo:", mode);
	await movieDataLoader.load(database, mode);

	console.log("Inicializando o servidor web...");
	await webServer.start();
};

type ServiceList = {
	database: Database;
	movieDataLoader: CsvDataLoader;
	webServer: WebServer;
};
