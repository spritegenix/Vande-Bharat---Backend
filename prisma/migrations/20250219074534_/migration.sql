/*
  Warnings:

  - You are about to drop the column `userId` on the `bookmarks` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `cart_item_histories` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `pageId` on the `donation_histories` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `donation_histories` table. All the data in the column will be lost.
  - You are about to drop the column `pageId` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `group_member_histories` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `group_members` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `notification_histories` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `order_histories` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `pageId` on the `page_follower_histories` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `page_follower_histories` table. All the data in the column will be lost.
  - You are about to drop the column `pageId` on the `page_followers` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `page_followers` table. All the data in the column will be lost.
  - You are about to drop the column `idHidden` on the `page_histories` table. All the data in the column will be lost.
  - You are about to drop the column `pageId` on the `product_histories` table. All the data in the column will be lost.
  - You are about to drop the column `pageId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `reaction_histories` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `reactions` table. All the data in the column will be lost.
  - You are about to drop the column `followingPagesCount` on the `user_histories` table. All the data in the column will be lost.
  - You are about to drop the column `joinedGroupsCount` on the `user_histories` table. All the data in the column will be lost.
  - You are about to drop the column `followingPagesCount` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `joinedGroupsCount` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `bookmarks_histories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reportTypes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `report_types_histories` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[pageId,postId]` on the table `bookmarks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[buyerId,sellerId,productId]` on the table `cart_items` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[memberId,groupId]` on the table `group_members` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[followerId,followingId]` on the table `page_followers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pageId,postId,commentId]` on the table `reactions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pageId` to the `bookmarks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyerId` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerId` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donatedId` to the `donations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donatorId` to the `donations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberId` to the `group_members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyerId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followerId` to the `page_followers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingId` to the `page_followers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageId` to the `reactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_userId_fkey";

-- DropForeignKey
ALTER TABLE "bookmarks_histories" DROP CONSTRAINT "bookmarks_histories_bookmarkId_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_userId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_authorId_fkey";

-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_pageId_fkey";

-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_userId_fkey";

-- DropForeignKey
ALTER TABLE "group_members" DROP CONSTRAINT "group_members_userId_fkey";

-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_userId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "page_followers" DROP CONSTRAINT "page_followers_pageId_fkey";

-- DropForeignKey
ALTER TABLE "page_followers" DROP CONSTRAINT "page_followers_userId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_pageId_fkey";

-- DropForeignKey
ALTER TABLE "reactions" DROP CONSTRAINT "reactions_userId_fkey";

-- DropForeignKey
ALTER TABLE "report_types_histories" DROP CONSTRAINT "report_types_histories_reportTypeId_fkey";

-- DropForeignKey
ALTER TABLE "reports" DROP CONSTRAINT "reports_reportTypeId_fkey";

-- DropIndex
DROP INDEX "bookmarks_userId_postId_key";

-- DropIndex
DROP INDEX "cart_items_userId_idx";

-- DropIndex
DROP INDEX "cart_items_userId_productId_key";

-- DropIndex
DROP INDEX "donations_pageId_idx";

-- DropIndex
DROP INDEX "donations_userId_idx";

-- DropIndex
DROP INDEX "group_members_userId_groupId_key";

-- DropIndex
DROP INDEX "group_members_userId_idx";

-- DropIndex
DROP INDEX "notifications_userId_idx";

-- DropIndex
DROP INDEX "orders_userId_idx";

-- DropIndex
DROP INDEX "page_followers_pageId_idx";

-- DropIndex
DROP INDEX "page_followers_userId_idx";

-- DropIndex
DROP INDEX "page_followers_userId_pageId_key";

-- DropIndex
DROP INDEX "products_pageId_idx";

-- DropIndex
DROP INDEX "reactions_userId_idx";

-- DropIndex
DROP INDEX "reactions_userId_postId_commentId_key";

-- AlterTable
ALTER TABLE "address_histories" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "admin_histories" ADD COLUMN     "adminRoleId" TEXT,
ALTER COLUMN "hash" DROP NOT NULL;

-- AlterTable
ALTER TABLE "bookmarks" DROP COLUMN "userId",
ADD COLUMN     "pageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "cart_item_histories" DROP COLUMN "userId",
ADD COLUMN     "buyerId" TEXT,
ADD COLUMN     "sellerId" TEXT;

-- AlterTable
ALTER TABLE "cart_items" DROP COLUMN "userId",
ADD COLUMN     "buyerId" TEXT NOT NULL,
ADD COLUMN     "sellerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "credential_histories" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "donation_histories" DROP COLUMN "pageId",
DROP COLUMN "userId",
ADD COLUMN     "donatedId" TEXT,
ADD COLUMN     "donatorId" TEXT;

-- AlterTable
ALTER TABLE "donations" DROP COLUMN "pageId",
DROP COLUMN "userId",
ADD COLUMN     "donatedId" TEXT NOT NULL,
ADD COLUMN     "donatorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "group_member_histories" DROP COLUMN "userId",
ADD COLUMN     "memberId" TEXT;

-- AlterTable
ALTER TABLE "group_members" DROP COLUMN "userId",
ADD COLUMN     "memberId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ip_address_histories" ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "notification_histories" DROP COLUMN "userId",
ADD COLUMN     "pageId" TEXT;

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "userId",
ADD COLUMN     "pageId" TEXT;

-- AlterTable
ALTER TABLE "order_histories" DROP COLUMN "userId",
ADD COLUMN     "buyerId" TEXT;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "userId",
ADD COLUMN     "buyerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "page_follower_histories" DROP COLUMN "pageId",
DROP COLUMN "userId",
ADD COLUMN     "followerId" TEXT,
ADD COLUMN     "followingId" TEXT,
ADD COLUMN     "status" "FollowStatus",
ADD COLUMN     "statusUpdatedAt" TIMESTAMP(3),
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "page_followers" DROP COLUMN "pageId",
DROP COLUMN "userId",
ADD COLUMN     "followerId" TEXT NOT NULL,
ADD COLUMN     "followingId" TEXT NOT NULL,
ADD COLUMN     "statusUpdatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "page_histories" DROP COLUMN "idHidden",
ADD COLUMN     "isHidden" BOOLEAN,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "product_histories" DROP COLUMN "pageId",
ADD COLUMN     "sellerId" TEXT;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "pageId",
ADD COLUMN     "sellerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reaction_histories" DROP COLUMN "userId",
ADD COLUMN     "pageId" TEXT;

-- AlterTable
ALTER TABLE "reactions" DROP COLUMN "userId",
ADD COLUMN     "pageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_histories" DROP COLUMN "followingPagesCount",
DROP COLUMN "joinedGroupsCount",
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "isVerified" DROP NOT NULL,
ALTER COLUMN "isVerified" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "followingPagesCount",
DROP COLUMN "joinedGroupsCount";

-- DropTable
DROP TABLE "bookmarks_histories";

-- DropTable
DROP TABLE "reportTypes";

-- DropTable
DROP TABLE "report_types_histories";

-- CreateTable
CREATE TABLE "bookmark_histories" (
    "id" TEXT NOT NULL,
    "bookmarkId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "postId" TEXT,
    "pageId" TEXT,

    CONSTRAINT "bookmark_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "report_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_type_histories" (
    "id" TEXT NOT NULL,
    "reportTypeId" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "report_type_histories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bookmarks_pageId_postId_key" ON "bookmarks"("pageId", "postId");

-- CreateIndex
CREATE INDEX "cart_items_buyerId_idx" ON "cart_items"("buyerId");

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_buyerId_sellerId_productId_key" ON "cart_items"("buyerId", "sellerId", "productId");

-- CreateIndex
CREATE INDEX "donations_donatorId_idx" ON "donations"("donatorId");

-- CreateIndex
CREATE INDEX "donations_donatedId_idx" ON "donations"("donatedId");

-- CreateIndex
CREATE INDEX "group_members_memberId_idx" ON "group_members"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "group_members_memberId_groupId_key" ON "group_members"("memberId", "groupId");

-- CreateIndex
CREATE INDEX "notifications_pageId_idx" ON "notifications"("pageId");

-- CreateIndex
CREATE INDEX "orders_buyerId_idx" ON "orders"("buyerId");

-- CreateIndex
CREATE INDEX "page_followers_followerId_idx" ON "page_followers"("followerId");

-- CreateIndex
CREATE INDEX "page_followers_followingId_idx" ON "page_followers"("followingId");

-- CreateIndex
CREATE UNIQUE INDEX "page_followers_followerId_followingId_key" ON "page_followers"("followerId", "followingId");

-- CreateIndex
CREATE INDEX "pages_slug_idx" ON "pages"("slug");

-- CreateIndex
CREATE INDEX "products_sellerId_idx" ON "products"("sellerId");

-- CreateIndex
CREATE INDEX "reactions_pageId_idx" ON "reactions"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "reactions_pageId_postId_commentId_key" ON "reactions"("pageId", "postId", "commentId");

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_donatorId_fkey" FOREIGN KEY ("donatorId") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_donatedId_fkey" FOREIGN KEY ("donatedId") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_members" ADD CONSTRAINT "group_members_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_followers" ADD CONSTRAINT "page_followers_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_followers" ADD CONSTRAINT "page_followers_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmark_histories" ADD CONSTRAINT "bookmark_histories_bookmarkId_fkey" FOREIGN KEY ("bookmarkId") REFERENCES "bookmarks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_reportTypeId_fkey" FOREIGN KEY ("reportTypeId") REFERENCES "report_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_type_histories" ADD CONSTRAINT "report_type_histories_reportTypeId_fkey" FOREIGN KEY ("reportTypeId") REFERENCES "report_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
