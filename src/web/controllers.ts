import AwardsController from "../controllers/awards-controller";
import SqliteDatabase from "../database/sqlite.database";
import { SqliteQueryStrategy } from "../database/sqlite.query-strategy";
import MovieRepository from "../repository/movie-repository";

const services = {
	database: new SqliteDatabase("database/database.sqlite3"),
};

export default {
	awards: new AwardsController(new MovieRepository(services.database, new SqliteQueryStrategy.Movies())),
};