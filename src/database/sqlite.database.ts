import fs from 'node:fs';
import path from "node:path";
import sqlite3 from "sqlite3";
import { Database } from "./database";

export default class SqliteDatabase implements Database {

	private _path: string;
	private _database: sqlite3.Database | undefined;

	/**
	 * @param databasePath Path to where the database file is stored. Relative to the project's root.
	 */
	public constructor (databasePath: string) {
		this._path = path.resolve(databasePath);
	}

	public async init() {
		return new Promise<void>((resolve, reject) => {
			this._database = new sqlite3.Database(this._path, (err) => {
				if (err) reject("Erro ao inicializar banco de dados SQLite: " + err.message);
				resolve();
			});
		});
	}

	public async migrate() {
		const initSql = fs.readFileSync(path.resolve("migrations", "schema_definition.sql"), "utf-8");
		return new Promise<void>((resolve, reject) => {
			this.database.exec(initSql, (err) => {
				if (err) reject(new Error("Erro ao inicializar banco de dados SQLite: " + err.message));
				resolve();
			});
		});
	}

	public async close() {
		console.log("Fechando banco de dados...");
		return new Promise<void>((resolve, reject) => {
			this.database.close((err) => {
				if (err) reject(new Error("Erro ao fechar banco de dados SQLite: " + err.message));
				resolve();
			});
		});
	}

	public async query<T>(sql: string, params?: any[]): Promise<T[]> {
		return new Promise<T[]>((resolve, reject) => {
			this.database.all<T>(sql, params, (err, rows) => {
				if (err) reject(new Error("Erro ao executar consulta SQL: " + err.message));
				resolve(rows);
			});
		});
	}

	public async exec(sql: string, params?: any[]): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.database.run(sql, params, (err) => {
				if (err) reject(new Error("Erro ao executar comando SQL: " + err.message));
				resolve();
			});
		});
	}

	private get database(): sqlite3.Database {
		if (!this._database) throw new Error("Banco de dados SQLite ainda nao foi inicializado.");
		return this._database;
	}

}