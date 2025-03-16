export interface Database {
	init(): Promise<void>;
	close(): Promise<void>;
}