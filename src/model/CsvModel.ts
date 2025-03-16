namespace CsvModel {

	export type MovieRow = {
		year: string;
		title: string;
		studios: string;
		producers: string;
		winner: string;
	};

	export function isMovieCsvRow(obj: unknown): obj is MovieRow {
		return typeof obj === "object" && obj !== null
			&& "year" in obj && typeof obj.year === "string"
			&& "title" in obj && typeof obj.title === "string"
			&& "studios" in obj && typeof obj.studios === "string"
			&& "producers" in obj && typeof obj.producers === "string"
			&& "winner" in obj && typeof obj.winner === "string";
	}

}