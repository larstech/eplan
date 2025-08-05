/*
  Warnings:

  - A unique constraint covering the columns `[customerId]` on the table `Job` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Job" ADD COLUMN     "customerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Job_customerId_key" ON "public"."Job"("customerId");

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
