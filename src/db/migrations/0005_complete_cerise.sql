CREATE TABLE IF NOT EXISTS "attachment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"productId" uuid NOT NULL,
	"url" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"key" text NOT NULL
);
