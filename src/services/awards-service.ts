import { DatabaseModel } from "../model/database-model";

export default class AwardsService {

	public async getMinMaxIntervals(movies: DatabaseModel.Movie[]): Promise<AwardsInterval> {
		const producers = new Map();
		return {} as AwardsInterval;
	}

}

export type AwardsInterval = {
	min: Interval[];
	max: Interval[];
};

type Interval = {
	producer: string;
	interval: number;
	previousWin: number;
	followingWin: number;
};