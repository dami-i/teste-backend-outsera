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

	public async getInstance() {
		return this._database;
	}

	public async init() {
		// TODO
	}

	public async close() {
		console.log("Fechando banco de dados...");
		this._database.close();
	}

}