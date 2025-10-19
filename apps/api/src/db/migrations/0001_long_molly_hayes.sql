CREATE TABLE "favorites" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "favorites_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"place_id" integer NOT NULL,
	"display_name" text NOT NULL,
	"date_added" timestamp DEFAULT now(),
	"user_id" text NOT NULL,
	CONSTRAINT "favorites_place_id_unique" UNIQUE("place_id")
);
--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;