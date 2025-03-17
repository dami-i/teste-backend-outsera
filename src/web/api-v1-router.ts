import Router from "express";

const v1 = Router();

v1.get("/", (_, res) => {
	return res.send("Hello World!");
});

export default v1;