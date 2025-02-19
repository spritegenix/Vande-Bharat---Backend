/*
  Warnings:

  - You are about to drop the column `time` on the `ip_addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ip_addresses" DROP COLUMN "time",
ADD COLUMN     "timestamp" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
