CREATE TABLE IF NOT EXISTS "movies" (
	"id"			INTEGER 	NOT NULL UNIQUE,
	"title"			TEXT 		NOT NULL,
	"year"			INTEGER 	NOT NULL,
	"studios"		TEXT 		NOT NULL,
	"producers"		TEXT 		NOT NULL,
	"winner"		INTEGER 	NOT NULL CHECK(winner in (0, 1)),
	"created_at"	DATETIME 	DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id" AUTOINCREMENT) ON CONFLICT ROLLBACK
);
-- TODO: Criar compound key com title + year codificado em base64.