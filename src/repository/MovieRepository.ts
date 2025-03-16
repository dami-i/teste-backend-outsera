import { Database } from "../database/Database.d";
import { DatabaseModel } from "../model/DatabaseModel";

export default class MovieRepository {

	private _database: Database;

	constructor (database: Database) {
		this._database = database;
	}

	public async resetDataset(movies: DatabaseModel.Movie[]): Promise<void> {
		// TODO
		movies;
	}

	public async insertMany(movies: DatabaseModel.Movie[]): Promise<void> {
		// TODO
		movies;
		this._database;
	}

}