-- CreateTable
CREATE TABLE "public"."Customer" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "travelTimeMinutes" INTEGER NOT NULL,
    "breakTimeMinutes" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);
