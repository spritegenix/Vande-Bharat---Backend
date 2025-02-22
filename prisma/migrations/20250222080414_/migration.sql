/*
  Warnings:

  - Changed the type of `message` on the `notifications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "message",
ADD COLUMN     "message" JSONB NOT NULL;

-- CreateIndex
CREATE INDEX "page_follower_histories_id_idx" ON "page_follower_histories"("id");

-- CreateIndex
CREATE INDEX "page_followers_id_idx" ON "page_followers"("id");

-- CreateIndex
CREATE INDEX "page_histories_id_idx" ON "page_histories"("id");

-- CreateIndex
CREATE INDEX "pages_id_idx" ON "pages"("id");
