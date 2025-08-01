/*
  Warnings:

  - A unique constraint covering the columns `[customerId]` on the table `CustomerContact` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `CustomerContact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CustomerContact" ADD COLUMN     "customerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CustomerContact_customerId_key" ON "public"."CustomerContact"("customerId");

-- AddForeignKey
ALTER TABLE "public"."CustomerContact" ADD CONSTRAINT "CustomerContact_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
