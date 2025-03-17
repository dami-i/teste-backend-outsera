export default class AwardsController {

	private _repository: MovieRepository;
	private _service: AwardsService;

	constructor (service: AwardsService, repository: MovieRepository) {
		this._repository = repository;
		this._service = service;
	}

	public async getMinMaxIntervals(): Promise<AwardsInterval> {
		// TODO:
		// Consultar o repositório de filmes
		// Chamar o serviço que filtra os registros, processa e calcula os intervalos
		// Encontrar os intervalos e retornar
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