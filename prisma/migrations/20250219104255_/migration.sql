-- AlterTable
ALTER TABLE "page_histories" ADD COLUMN     "followingCount" INTEGER;

-- AlterTable
ALTER TABLE "pages" ADD COLUMN     "followingCount" INTEGER DEFAULT 0;
