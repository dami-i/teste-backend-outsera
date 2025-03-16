import { Database } from '../database/Database';

export interface CsvDataLoader {
	startupLoad(databaseService: Database): Promise<void>;
}