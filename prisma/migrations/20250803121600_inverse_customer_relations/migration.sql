/*
  Warnings:

  - You are about to drop the column `customerId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `CustomerContact` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[addressId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contactId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addressId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactId` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Address" DROP CONSTRAINT "Address_customerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CustomerContact" DROP CONSTRAINT "CustomerContact_customerId_fkey";

-- DropIndex
DROP INDEX "public"."Address_customerId_key";

-- DropIndex
DROP INDEX "public"."CustomerContact_customerId_key";

-- AlterTable
ALTER TABLE "public"."Address" DROP COLUMN "customerId";

-- AlterTable
ALTER TABLE "public"."Customer" ADD COLUMN     "addressId" TEXT NOT NULL,
ADD COLUMN     "contactId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."CustomerContact" DROP COLUMN "customerId";

-- CreateIndex
CREATE UNIQUE INDEX "Customer_addressId_key" ON "public"."Customer"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_contactId_key" ON "public"."Customer"("contactId");

-- AddForeignKey
ALTER TABLE "public"."Customer" ADD CONSTRAINT "Customer_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "public"."Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Customer" ADD CONSTRAINT "Customer_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "public"."CustomerContact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
