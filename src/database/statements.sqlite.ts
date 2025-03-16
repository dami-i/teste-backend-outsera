import { DatabaseModel } from "../model/DatabaseModel";

export const sqliteStatements = {
	movies: {
		resetTo(_movies: DatabaseModel.Movie[]) {
			return `SELECT 1;`;
		},
	}
};