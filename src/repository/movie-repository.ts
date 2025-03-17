import { Database } from "../database/database";
import { QueryStrategy } from "../database/query-strategy";
import { DatabaseModel } from "../model/database-model";

export default class MovieRepository {

	private _database: Database;
	private _strategy: QueryStrategy.Movies;

	constructor (database: Database, strategy: QueryStrategy.Movies) {
		this._database = database;
		this._strategy = strategy;
	}

	public async resetTo(movies: DatabaseModel.Movie[]) {
		const { query, params } = this._strategy.resetTo(movies);
		await this._database.exec(query, params);
	}

	public async insertMany(movies: DatabaseModel.Movie[]) {
		const { query, params } = this._strategy.insertMany(movies);
		await this._database.exec(query, params);
	}

}