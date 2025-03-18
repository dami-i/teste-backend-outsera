import { Database } from "../database/database";
import { QueryStrategy } from "../database/query-strategy";
import { DatabaseModel } from "../model/database-model";

export default class MovieRepository {

	private _database: Database;
	private _queries: QueryStrategy.Movies;

	constructor (database: Database, queryStrategy: QueryStrategy.Movies) {
		this._database = database;
		this._queries = queryStrategy;
	}

	public async resetTo(movies: DatabaseModel.Movie[]) {
		const queryPlan = this._queries.resetTo(movies);
		for await (const { query, params } of queryPlan) {
			await this._database.exec(query, params);
		}
	}

	public async insertMany(movies: DatabaseModel.Movie[]) {
		const queryPlan = this._queries.insertMany(movies);
		for await (const { query, params } of queryPlan) {
			await this._database.exec(query, params);
		}
	}

	public async findAllWithAwards(): Promise<DatabaseModel.Movie[]> {
		const { query } = this._queries.findWinners();
		const movies = await this._database.query<DatabaseModel.Movie>(query);
		return movies;
	}

}