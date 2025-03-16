import { Database } from "../database/Database";

export interface CsvDataLoader {
	load(database: Database, mode: Mode): Promise<void>;
}

export type Mode = "replace" | "append";

export function isMode(mode: unknown): mode is Mode {
	return typeof mode === "string" && mode === "replace" || mode === "append";
}
