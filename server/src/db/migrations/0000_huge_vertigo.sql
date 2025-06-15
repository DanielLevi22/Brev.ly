CREATE TABLE "links" (
	"id" serial PRIMARY KEY NOT NULL,
	"short_key" text NOT NULL,
	"original_url" text NOT NULL,
	"access_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "links_short_key_unique" UNIQUE("short_key")
);
