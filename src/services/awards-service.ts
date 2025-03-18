import { DatabaseModel } from "../model/database-model";

export default class AwardsService {

	public async getMinMaxIntervals(awardedMovies: DatabaseModel.Movie[]): Promise<AwardsInterval> {
		const awards: Record<string, Awards> = {};

		for (const movie of awardedMovies) {
			const producers = movie.producers
				.split(/,?\s+?and\s+|\s*?,\s*?/)
				.map(producer => producer.trim())
				.filter(producer => producer.length > 0);

			for (const producer of producers) {
				if (!(producer in awards)) {
					awards[producer] = {
						years: [],
						intervals: [],
						minIntervals: [],
						maxIntervals: [],
						minInterval: Infinity,
						maxInterval: 0,
					};
				}
				awards[producer]!.years.push(movie.year);
			}
		}

		for (const producer of Object.keys(awards)) {
			const award = awards[producer]!;
			if (award.years.length < 2) {
				delete awards[producer];
				continue;
			}
			award.years.sort((a, b) => a - b);
			
			for (let i = 0; i < award.years.length - 1; i++) {
				const currentYear = award.years[i]!;
				const nextYear = award.years[i + 1]!;
				const interval = nextYear - currentYear;
				award.intervals.push({ interval, previousWin: currentYear, followingWin: nextYear });
			}

			award.minInterval = award.intervals.reduce((min, interval) => Math.min(min, interval.interval), Infinity);
			award.maxInterval = award.intervals.reduce((max, interval) => Math.max(max, interval.interval), 0);

			for (const interval of award.intervals) {
				if (interval.interval === award.minInterval) {
					award.minIntervals.push(interval);
				}
				if (interval.interval === award.maxInterval) {
					award.maxIntervals.push(interval);
				}
			}
		}

		const result: AwardsInterval = { min: [], max: [] };

		const generalMinInterval = Object.values(awards).reduce((min, award) => Math.min(min, award.minInterval), Infinity);
		const generalMaxInterval = Object.values(awards).reduce((max, award) => Math.max(max, award.maxInterval), 0);

		for (const producer of Object.keys(awards)) {
			const award = awards[producer]!;
			if (award.minInterval === generalMinInterval) {
				const min = award.minIntervals.map(interval => ({ producer, ...interval, }));
				result.min.push(...min);
			}
			if (award.maxInterval === generalMaxInterval) {
				const max = award.maxIntervals.map(interval => ({ producer, ...interval, }));
				result.max.push(...max);
			}
		}

		return result;
	}

}

export type AwardsInterval = {
	min: Result[];
	max: Result[];
};

type Result = { producer: string; } & Interval;

type Interval = {
	interval: number;
	previousWin: number;
	followingWin: number;
};

type Awards = {
	years: number[];
	intervals: Interval[];
	minIntervals: Interval[];
	maxIntervals: Interval[];
	minInterval: number;
	maxInterval: number;
};