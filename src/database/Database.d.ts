export interface Database {
	setup(): Promise<void>;
	unlock(): Promise<void>;
	execute(query: string): Promise<void>;
}