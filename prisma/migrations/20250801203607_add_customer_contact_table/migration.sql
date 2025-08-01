-- CreateTable
CREATE TABLE "public"."CustomerContact" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "CustomerContact_pkey" PRIMARY KEY ("id")
);
