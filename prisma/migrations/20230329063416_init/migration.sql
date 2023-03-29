-- CreateTable
CREATE TABLE "Profiles" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "ico" TEXT NOT NULL,
    "dic" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "houseNo" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "invStreet" TEXT NOT NULL,
    "invHouseNo" TEXT NOT NULL,
    "invPostalCode" TEXT NOT NULL,
    "invCity" TEXT NOT NULL,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_userId_key" ON "Profiles"("userId");

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
