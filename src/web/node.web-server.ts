import net from "node:net";
import http from "node:http";
import { WebServer } from "../interfaces";
import { setupApp } from "./app";
import { WebServerControllers } from "../controllers/web-server.controllers";

export default class NodeWebServer implements WebServer {

	public async start(controllers: WebServerControllers) {
		const app = this._createApp(controllers);
		const server = http.createServer(app);
		const port = await this._findFreePort();
		server.listen(port, () => {
			console.log(`O servidor está rodando em http://localhost:${port}/`);
		});
	}

	private _createApp(controllers: WebServerControllers) {
		const app = setupApp(controllers);
		return app;
	}

	private async _findFreePort() {
		let port = 3000;
		while (port < 65535) {
			const isFree = await new Promise((resolve) => {
				const server = net.createServer();
				server.on("error", (err) => {
					if ((err as RunningServerError).code === "EADDRINUSE") {
						resolve(false);
					} else {
						resolve(false);
					}
				});
				server.listen(port, () => {
					server.close(() => resolve(true));
				});
			});
			if (isFree) return port;
			port++;
		}
		throw new Error("Não foram encontradas portas livres. Encerrando aplicação.");
	}

}

interface RunningServerError extends Error {
	code?: string;
}