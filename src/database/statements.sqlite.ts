import { DatabaseModel } from "../model/database-model";

export const sqliteStatements = {
	movies: {
		resetTo(_movies: DatabaseModel.Movie[]) {
			return `SELECT 1;`;
		},
	}
};