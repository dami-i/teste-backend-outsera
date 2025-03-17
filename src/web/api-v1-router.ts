import Router from "express";
import { AwardsController } from "./controllers";

const v1 = Router();

v1.get("/", (_, res) => {
	return res.send("Hello World!"); // TODO: Retornar documentação da API
});

v1.get("/awards-interval", async (_, res, next) => {
	try {
		const result = await AwardsController.getMinMaxIntervals();
		return res.status(200).json(result);
	} catch (err) {
		return next(err);
	}
});

export default v1;