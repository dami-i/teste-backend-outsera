import express from "express";

import router from "./router";

const app = express();

app.use(express.json());
app.use(router); // TODO prefixar com /api/v1

// TODO Adicionar handlers para 404 e 500

export default app;