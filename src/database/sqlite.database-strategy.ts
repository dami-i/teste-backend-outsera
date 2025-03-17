import { DatabaseModel } from "../model/database-model";
import { DatabaseStrategy } from "./database-strategy";

export namespace SqliteDatabaseStrategy {

	export class Movies implements DatabaseStrategy.Movies {
		resetTo(_movies: DatabaseModel.Movie[]): { query: string, params: any[]; } {
			return {
				query: "SELECT 1;",
				params: [],
			};
		}
		insertMany(_movies: DatabaseModel.Movie[]): { query: string, params: any[]; } {
			return {
				query: "SELECT 1;",
				params: [],
			};
		}
	}

}