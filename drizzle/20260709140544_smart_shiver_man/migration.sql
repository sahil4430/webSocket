CREATE TYPE "outcome" AS ENUM('attacker_wins', 'defender_wins', 'draw');--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY,
	"user_name" text NOT NULL UNIQUE,
	"email" text NOT NULL UNIQUE,
	"created_at" timestamp DEFAULT now(),
	"password" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gesture" (
	"id" serial PRIMARY KEY,
	"ges_name" text NOT NULL UNIQUE,
	"base_power" integer NOT NULL,
	"efects" text NOT NULL,
	"icon_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gesture_matchup" (
	"id" serial PRIMARY KEY,
	"attacker_gesture_id" integer NOT NULL,
	"defender_gesture_id" integer NOT NULL,
	"damage" integer DEFAULT 0 NOT NULL,
	"outcome" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "gesture_matchup" ADD CONSTRAINT "gesture_matchup_attacker_gesture_id_gesture_id_fkey" FOREIGN KEY ("attacker_gesture_id") REFERENCES "gesture"("id");--> statement-breakpoint
ALTER TABLE "gesture_matchup" ADD CONSTRAINT "gesture_matchup_defender_gesture_id_gesture_id_fkey" FOREIGN KEY ("defender_gesture_id") REFERENCES "gesture"("id");