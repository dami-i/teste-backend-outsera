import path from "node:path";
import express, { ErrorRequestHandler, RequestHandler } from "express";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import { createV1Router } from "./api-v1-router";
import { WebServerControllers } from "../controllers/web-server.controllers";

export function setupApp(controllers: WebServerControllers) {
	const app = express();
	const v1Router = createV1Router(controllers);

	app.disable("x-powered-by");
	
	app.use("/test", (_, res) => { return res.status(200).send("OK"); });

	const apiDoc = YAML.load(path.resolve("api/tsp-output/schema/openapi.1.0.yaml"));
	app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(apiDoc));
	app.get("/", (_, res) => { return res.redirect("/api/docs"); });

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
