-- AlterTable
ALTER TABLE "group_histories" ADD COLUMN     "membersCount" INTEGER;

-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "membersCount" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "page_histories" ADD COLUMN     "followerCount" INTEGER,
ADD COLUMN     "postCount" INTEGER;

-- AlterTable
ALTER TABLE "pages" ADD COLUMN     "followerCount" INTEGER DEFAULT 0,
ADD COLUMN     "postCount" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "user_histories" ADD COLUMN     "followingPagesCount" INTEGER,
ADD COLUMN     "joinedGroupsCount" INTEGER;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "followingPagesCount" INTEGER DEFAULT 0,
ADD COLUMN     "joinedGroupsCount" INTEGER DEFAULT 0;
