import MovieRepository from "../repository/movie-repository";
import AwardsService, { AwardsInterval } from "../services/awards-service";

export default class AwardsController {

	private _repository: MovieRepository;
	private _service: AwardsService = new AwardsService();

	constructor (repository: MovieRepository) {
		this._repository = repository;
	}

	public async getMinMaxIntervals(): Promise<AwardsInterval> {
		const movies = await this._repository.findAllWithAwards();
		const result = this._service.getMinMaxIntervals(movies);
		return result;
	}

}
