import path from "node:path";
import { Database } from "./Database";

export default class SqliteDatabase implements Database {

	private _path: string;

	/**
	 * @param databasePath Path to where the database file is stored. Relative to the project's root.
	 */
	public constructor (databasePath: string) {
		this._path = path.resolve(databasePath);
	}
	
	public async setup(): Promise<void> {
		// TODO
	}
	
	public async unlock(): Promise<void> {
		// TODO		
	}

	public async getInstance(): Promise<SqliteDatabase> {
		return this;
	}

	public async execute(query: string): Promise<void> {
		query;
		this._path;
	}

}