export interface Database {
	setup(): Promise<void>;
	close(): Promise<void>;
	execute(query: string): Promise<void>;
}