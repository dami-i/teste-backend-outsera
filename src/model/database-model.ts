export namespace DatabaseModel {

	export type Movie = {
		id?: number;
		year: number;
		title: string;
		studios: string;
		producers: string;
		winner: boolean;
		key: string;
	};

}