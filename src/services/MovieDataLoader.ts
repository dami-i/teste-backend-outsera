import path from "node:path";
import CsvParser from "../lib/CsvParser";
import { Mode, CsvDataLoader } from "./CsvDataLoader";
import { Database } from "../database/Database";
import { CsvModel } from "../model/CsvModel";

export default class MovieDataLoader implements CsvDataLoader {

	private _path: string;

	/**
	 * @param csvPath Path to where the CSV file is stored. Relative to the project's root.
	 */
	public constructor (csvPath: string) {
		this._path = path.resolve(csvPath);
	}

	public async load(database: Database, mode: Mode): Promise<void> {
		const movieCsvRows = await CsvParser.parseFile<CsvModel.MovieRow>(this._path);

		if (movieCsvRows.some(row => !CsvModel.isMovieCsvRow(row))) {
			throw new Error("Há um ou mais linhas inválidas no arquivo CSV.");
		}

		// TODO Converter para formato do modelo
		mode;
		const query = movieCsvRows.toString();
		// const query = "";

		return database.execute(query);
	}

}