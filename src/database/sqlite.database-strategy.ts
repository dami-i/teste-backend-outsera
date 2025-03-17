import { DatabaseModel } from "../model/database-model";
import { DatabaseStrategy } from "./database-strategy";

export namespace SqliteDatabaseStrategy {

	export class Movie implements DatabaseStrategy.Movie {

		resetTo(_: DatabaseModel.Movie[]): [string, any[]] {
			throw new Error("Method not implemented.");
		}

		insertMany(_: DatabaseModel.Movie[]): [string, any[]] {
			throw new Error("Method not implemented.");
		}
		
	}

}