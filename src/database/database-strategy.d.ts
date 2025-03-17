export namespace DatabaseStrategy {

	export interface Movie {
		resetTo(movies: DatabaseModel.Movie[]): [string, any[]];
		insertMany(movies: DatabaseModel.Movie[]): [string, any[]];
	}

}