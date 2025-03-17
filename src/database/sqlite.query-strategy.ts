import { DatabaseModel } from "../model/database-model";
import { QueryStrategy } from "./query-strategy";

export namespace SqliteQueryStrategy {

	export class Movies implements QueryStrategy.Movies {
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