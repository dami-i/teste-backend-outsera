import { WebServerControllers } from "../controllers/web-server.controllers";

export interface WebServer {
	start(controllers: WebServerControllers): Promise<void>;
}
