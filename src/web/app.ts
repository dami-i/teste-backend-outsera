import express, { ErrorRequestHandler, RequestHandler } from "express";

const app = express();

app.use(express.json());

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

export default app;