ALTER TABLE "product" ADD COLUMN "colors" json DEFAULT '[]'::json NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "sizes" json DEFAULT '[]'::json NOT NULL;