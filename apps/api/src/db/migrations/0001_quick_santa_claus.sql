CREATE TABLE "favorites" (
	"id" integer PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"display_name" text NOT NULL,
	"date_added" timestamp DEFAULT now()
);
