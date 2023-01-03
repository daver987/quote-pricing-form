-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "emailAddress" TEXT NOT NULL,
    "phoneNumber" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pickupDate" TEXT,
    "pickupTime" TEXT,
    "isRoundTrip" BOOLEAN NOT NULL DEFAULT false,
    "returnPickupDate" TEXT,
    "returnPickupTime" TEXT,
    "originFormattedAddress" TEXT NOT NULL,
    "originName" TEXT NOT NULL,
    "originPlaceId" TEXT NOT NULL,
    "startLat" DOUBLE PRECISION NOT NULL,
    "startLng" DOUBLE PRECISION NOT NULL,
    "destinationFormattedAddress" TEXT NOT NULL,
    "destinationName" TEXT NOT NULL,
    "destinationPlaceId" TEXT NOT NULL,
    "endLat" DOUBLE PRECISION NOT NULL,
    "endLng" DOUBLE PRECISION NOT NULL,
    "vehicleTypeLabel" TEXT NOT NULL,
    "vehicleTypeValue" INTEGER NOT NULL,
    "serviceTypeLabel" TEXT NOT NULL,
    "serviceTypeValue" INTEGER NOT NULL,
    "passengersLabel" TEXT,
    "passengersValue" INTEGER,
    "isItHourly" BOOLEAN NOT NULL DEFAULT false,
    "hoursLabel" TEXT,
    "hoursValue" DOUBLE PRECISION,
    "distanceText" TEXT,
    "distanceValue" DOUBLE PRECISION,
    "durationText" TEXT,
    "durationValue" DOUBLE PRECISION,
    "calculatedDistance" DOUBLE PRECISION,
    "baseRate" DOUBLE PRECISION,
    "fuelSurcharge" DOUBLE PRECISION,
    "gratuity" DOUBLE PRECISION,
    "HST" DOUBLE PRECISION,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emailAddress_key" ON "User"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Quote_id_key" ON "Quote"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Quote_userId_key" ON "Quote"("userId");

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
