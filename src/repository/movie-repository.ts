import { Database } from "../database/database";
import { DatabaseStrategy } from "../database/database-strategy";
import { DatabaseModel } from "../model/database-model";

export default class MovieRepository {

	private _database: Database;
	private _strategy: DatabaseStrategy.Movies;

	constructor (database: Database, strategy: DatabaseStrategy.Movies) {
		this._database = database;
		this._strategy = strategy;
	}

	public async resetTo(movies: DatabaseModel.Movie[]) {
		const { query, params } = this._strategy.resetTo(movies);
		await this._database.exec(query, params);
	}

	public async insertMany(movies: DatabaseModel.Movie[]) {
		// TODO
		movies;
		this._database;
	}

}