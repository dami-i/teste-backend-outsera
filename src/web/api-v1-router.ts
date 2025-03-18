import Router from "express";
import { WebServerControllers } from "../controllers/web-server.controllers";

export function createV1Router(controllers: WebServerControllers) {
	const v1 = Router();

	v1.get("/awards-interval", async (_, res, next) => {
		try {
			const result = await controllers.awards.getMinMaxIntervals();
			return res.status(200).json(result);
		} catch (err) {
			return next(err);
		}
	});

	v1.get("/", (_, res) => {
		return res.redirect("/api/docs");
	});

	return v1;
}