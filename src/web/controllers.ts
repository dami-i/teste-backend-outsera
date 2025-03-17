import AwardsController from "../controllers/awards-controller";
import { SqliteQueryStrategy } from "../database/sqlite.query-strategy";
import { services } from "../init";
import MovieRepository from "../repository/movie-repository";

export default {
	awards: new AwardsController(new MovieRepository(services.database, new SqliteQueryStrategy.Movies())),
};