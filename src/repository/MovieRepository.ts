import { Database } from "../database/Database.d";
import { sqliteStatements } from "../database/statements.sqlite";
import { DatabaseModel } from "../model/DatabaseModel";

export default class MovieRepository {

	private _database: Database;
	private _statements: Record<string, any> = sqliteStatements;

	constructor (database: Database) {
		this._database = database;
	}

	public async resetTo(movies: DatabaseModel.Movie[]) {
		await this._database.exec(this._statements["movies"].resetTo(movies));
	}

	public async insertMany(movies: DatabaseModel.Movie[]) {
		// TODO
		movies;
		this._database;
	}

}