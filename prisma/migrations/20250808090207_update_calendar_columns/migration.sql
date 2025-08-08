/*
  Warnings:

  - You are about to drop the column `endDate` on the `Calendar` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Calendar` table. All the data in the column will be lost.
  - Added the required column `date` to the `Calendar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Calendar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Calendar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Calendar" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
