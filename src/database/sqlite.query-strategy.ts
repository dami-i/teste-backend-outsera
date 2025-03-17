import { DatabaseModel } from "../model/database-model";
import { QueryStrategy } from "./query-strategy";

export namespace SqliteQueryStrategy {

	export class Movies implements QueryStrategy.Movies {
		resetTo(_movies: DatabaseModel.Movie[]): { query: string, params: any[]; }[] {

			return [{
				query: "INSERT INTO movies (title, year, studios, producers, winner) VALUES (?, ?, ?, ?, ?);",
				params: ["Um Teste Bom Pra Cachorro", 2020, "Test Studios", "Testers", true],
			}];
		}
		insertMany(_movies: DatabaseModel.Movie[]): { query: string, params: any[]; }[] {
			return [{
				query: "INSERT INTO movies (title, year, studios, producers, winner) VALUES (?, ?, ?, ?, ?);",
				params: ["Teste de Inserção", 2025, "Test Studios", "Testers", false],
			}];
		}
	}

}