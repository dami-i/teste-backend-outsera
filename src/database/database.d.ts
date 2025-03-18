export interface Database {
	init(): Promise<void>;
	migrate(): Promise<void>;
	close(): Promise<void>;
	query<T>(sql: string, params?: any[]): Promise<T[]>;
	exec(sql: string, params?: any[]): Promise<void>;
}