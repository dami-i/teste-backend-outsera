import express, { ErrorRequestHandler, RequestHandler } from "express";
import { createV1Router } from "./api-v1-router";
import { WebServerControllers } from "../controllers/web-server.controllers";

export function setupApp(controllers: WebServerControllers) {
	const app = express();

	const v1Router = createV1Router(controllers);

	app.use("/test", (_, res) => { return res.status(200).send("OK"); });
	
	app.use(express.json());

	app.use("/api/v1", v1Router);

	const notFoundHandler: RequestHandler = (_req, res) => {
		return res.status(404).json({ error: "Not Found" });
	};
	const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
		console.log(err);
		console.log("------\nOcorreu um erro que retornou 500, mas o servidor continua rodando.");
		return res.status(500).json({ error: "Internal server error" });
	};

	app.use(notFoundHandler);
	app.use(errorHandler);

	return app;
}
