-- CreateEnum
CREATE TYPE "FollowStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "isBlocked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "page_followers" ADD COLUMN     "status" "FollowStatus" NOT NULL DEFAULT 'PENDING';
