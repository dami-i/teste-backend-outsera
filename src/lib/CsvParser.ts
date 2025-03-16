import fs from "node:fs";
import papa from "papaparse";

export default class CsvParser {

	public static async parseFile<T extends Record<string, any>>(csvPath: string): Promise<T[]> {
		let fileContents;
		try {
			fileContents = fs.readFileSync(csvPath, "utf-8");
		} catch (err) {
			throw new Error("Não foi possível ler ou encontrar o arquivo CSV.");
		}
		const csvContents = await papa.parse<T>(fileContents, {
			header: true,
			delimiter: ";",
			quoteChar: "",
			skipEmptyLines: true,
		});
		if (csvContents.errors.length > 0) {
			throw new Error("Error parsing CSV file");
		}
		return csvContents.data;
	}

}