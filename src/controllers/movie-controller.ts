export default class MovieController {

	public static async getAwardsInterval(): Promise<AwardsInterval> {
		return {} as AwardsInterval;
	}

}

type AwardsInterval = {
	min: Interval[];
	max: Interval[];
};

type Interval = {
	producer: string;
	interval: number;
	previousWin: number;
	followingWin: number;
};