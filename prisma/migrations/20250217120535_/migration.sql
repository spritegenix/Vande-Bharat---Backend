-- CreateEnum
CREATE TYPE "PagePrivacy" AS ENUM ('PRIVATE', 'PUBLIC');

-- AlterTable
ALTER TABLE "page_histories" ADD COLUMN     "privacy" TEXT;

-- AlterTable
ALTER TABLE "pages" ADD COLUMN     "privacy" "PagePrivacy" NOT NULL DEFAULT 'PUBLIC';
