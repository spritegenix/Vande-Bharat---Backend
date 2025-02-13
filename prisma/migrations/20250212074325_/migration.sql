/*
  Warnings:

  - You are about to drop the column `salt` on the `user_histories` table. All the data in the column will be lost.
  - Added the required column `hash` to the `admin_histories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admin_histories" ADD COLUMN     "hash" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_histories" DROP COLUMN "salt";
