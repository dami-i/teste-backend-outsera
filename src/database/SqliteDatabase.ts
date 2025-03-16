import path from "node:path";
import sqlite3 from "sqlite3";
import { Database } from "./Database";

export default class SqliteDatabase implements Database {

	private _path: string;
	private _database: sqlite3.Database;

	/**
	 * @param databasePath Path to where the database file is stored. Relative to the project's root.
	 */
	public constructor (databasePath: string) {
		this._path = path.resolve(databasePath);
		this._database = new sqlite3.Database(this._path, (err) => {
			if (err) throw new Error("Erro ao inicializar banco de dados SQLite: " + err.message);
		});
	}

	public async setup(): Promise<void> {
		// TODO
	}

	public async close(): Promise<void> {
		this._database.close();
	}

	public async getInstance(): Promise<SqliteDatabase> {
		return this;
	}

	public async execute(query: string): Promise<void> {
		query;
		this._path;
	}

}