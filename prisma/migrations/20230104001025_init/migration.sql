-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
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
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "quoteNumber" SERIAL NOT NULL,
    "pickupDate" TEXT NOT NULL,
    "pickupTime" TEXT NOT NULL,
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
    "passengersLabel" TEXT NOT NULL,
    "passengersValue" INTEGER NOT NULL,
    "isItHourly" BOOLEAN NOT NULL DEFAULT false,
    "hoursLabel" TEXT,
    "hoursValue" DOUBLE PRECISION,
    "distanceText" TEXT,
    "distanceValue" DOUBLE PRECISION NOT NULL,
    "durationText" TEXT,
    "durationValue" DOUBLE PRECISION NOT NULL,
    "calculatedDistance" DOUBLE PRECISION NOT NULL,
    "baseRate" DOUBLE PRECISION,
    "fuelSurcharge" DOUBLE PRECISION,
    "gratuity" DOUBLE PRECISION,
    "HST" DOUBLE PRECISION,
    "userId" TEXT,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emailAddress_key" ON "User"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Quote_quoteNumber_key" ON "Quote"("quoteNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Quote_userId_key" ON "Quote"("userId");

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
