-- AlterTable
ALTER TABLE "group_histories" ADD COLUMN     "isBlocked" BOOLEAN,
ADD COLUMN     "isHidden" BOOLEAN,
ADD COLUMN     "isVerified" BOOLEAN;

-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "page_histories" ADD COLUMN     "isVerified" BOOLEAN;

-- AlterTable
ALTER TABLE "pages" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "user_histories" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;
