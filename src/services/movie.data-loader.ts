import path from "node:path";
import CsvParser from "../lib/csv-parser";
import { Mode, CsvDataLoader } from "./data-loader";
import { Database } from "../database/database";
import MovieRepository from "../repository/movie-repository";
import { CsvModel } from "../model/csv-model";

export default class MovieDataLoader implements CsvDataLoader {

	private _path: string;

	/**
	 * @param csvPath Path to where the CSV file is stored. Relative to the project's root.
	 */
	public constructor (csvPath: string) {
		this._path = path.resolve(csvPath);
	}

	public async load(database: Database, mode: Mode) {
		const movieCsvRows = await CsvParser.parseFile<CsvModel.MovieRow>(this._path);
		if (movieCsvRows.some(row => !CsvModel.isMovieCsvRow(row))) {
			throw new Error("Há um ou mais linhas inválidas no arquivo CSV.");
		}
		const movieDatabaseRows = movieCsvRows.map(CsvModel.databaseAdapter);

		try {
			const repository = new MovieRepository(database);
			if (mode === "replace") {
				await repository.resetTo(movieDatabaseRows);
			} else if (mode = "append") {
				await repository.insertMany(movieDatabaseRows);
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : typeof err === "string" ? err : "";
			throw new Error("Ocorreu um erro ao carregar os dados do CSV no banco de dados: " + msg);
		}
	}

}