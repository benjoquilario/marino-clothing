ALTER TABLE "color" ALTER COLUMN "createdAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "color" ALTER COLUMN "updatedAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "color" ADD COLUMN "productId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "color" ADD COLUMN "inStock" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "size" ADD COLUMN "productId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "size" ADD COLUMN "inStock" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "color" DROP COLUMN IF EXISTS "product_id";--> statement-breakpoint
ALTER TABLE "color" DROP COLUMN IF EXISTS "is_available";--> statement-breakpoint
ALTER TABLE "product" DROP COLUMN IF EXISTS "brand";--> statement-breakpoint
ALTER TABLE "product" DROP COLUMN IF EXISTS "colors";--> statement-breakpoint
ALTER TABLE "product" DROP COLUMN IF EXISTS "sizes";--> statement-breakpoint
ALTER TABLE "size" DROP COLUMN IF EXISTS "product_id";--> statement-breakpoint
ALTER TABLE "size" DROP COLUMN IF EXISTS "is_available";