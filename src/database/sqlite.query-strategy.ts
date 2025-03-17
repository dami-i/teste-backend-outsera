import { DatabaseModel } from "../model/database-model";
import { QueryStrategy } from "./query-strategy";

export namespace SqliteQueryStrategy {

	export class Movies implements QueryStrategy.Movies {

		public resetTo(movies: DatabaseModel.Movie[]): QueryStrategy.QueryPlan {
			const inserts: QueryStrategy.Query[] = movies.map(movie => {
				return {
					query: "INSERT INTO movies (title, year, studios, producers, winner) VALUES (?, ?, ?, ?, ?);",
					params: [movie.title, movie.year, movie.studios, movie.producers, movie.winner],
				};
			});
			return [
				{ query: "BEGIN TRANSACTION;" },
				{ query: "DELETE FROM movies;" },
				{ query: "UPDATE SQLITE_SEQUENCE SET seq = 0 WHERE name = 'movies';" },
				...inserts,
				{ query: "COMMIT;" },
			];
		}

		public insertMany(movies: DatabaseModel.Movie[]): QueryStrategy.QueryPlan {
			const inserts: QueryStrategy.Query[] = movies.map(movie => {
				return {
					query: "INSERT INTO movies (title, year, studios, producers, winner) VALUES (?, ?, ?, ?, ?);",
					params: [movie.title, movie.year, movie.studios, movie.producers, movie.winner],
				};
			});
			return [
				{ query: "BEGIN TRANSACTION;" },
				...inserts,
				{ query: "COMMIT;" },
			];
		}

		public findWinners(): QueryStrategy.Query {
			return { query: "SELECT * FROM movies WHERE winner = 1;" };
		}

	}

}
