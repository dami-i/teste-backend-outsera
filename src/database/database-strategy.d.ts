export namespace DatabaseStrategy {

	export interface Movies {
		resetTo(movies: DatabaseModel.Movie[]): { query: string, params: any[]; };
		insertMany(movies: DatabaseModel.Movie[]): { query: string, params: any[]; };
	}

}