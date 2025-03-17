export namespace QueryStrategy {

	type Query = { query: string, params: any[]; };
	export type QueryPlan = Query[];

	export interface Movies {
		resetTo(movies: DatabaseModel.Movie[]): QueryPlan;
		insertMany(movies: DatabaseModel.Movie[]): QueryPlan;
	}

}