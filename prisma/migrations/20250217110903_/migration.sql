-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'name',
ADD COLUMN     "slug" TEXT;
