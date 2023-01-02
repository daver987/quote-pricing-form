-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "phoneNumber" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" SERIAL NOT NULL,
    "pickupDate" TEXT,
    "pickupTime" TEXT,
    "returnPickupDate" TEXT,
    "returnPickupTime" TEXT,
    "isRoundTrip" BOOLEAN,
    "originName" TEXT NOT NULL,
    "originFormattedAddress" TEXT NOT NULL,
    "originPlaceId" TEXT NOT NULL,
    "startLat" DOUBLE PRECISION NOT NULL,
    "startLng" DOUBLE PRECISION NOT NULL,
    "destinationName" TEXT NOT NULL,
    "destinationFormattedAddress" TEXT NOT NULL,
    "destinationPlaceId" TEXT NOT NULL,
    "endLat" DOUBLE PRECISION NOT NULL,
    "endLng" DOUBLE PRECISION NOT NULL,
    "durationText" TEXT NOT NULL,
    "durationValue" INTEGER NOT NULL,
    "distanceText" TEXT NOT NULL,
    "distanceValue" INTEGER NOT NULL,
    "calculatedDistance" DOUBLE PRECISION NOT NULL,
    "serviceType" TEXT NOT NULL,
    "serviceTypeValue" INTEGER NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "vehicleTypeValue" INTEGER NOT NULL,
    "passengers" INTEGER NOT NULL,
    "passengersLabel" TEXT NOT NULL,
    "hours" INTEGER,
    "hoursLabel" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emailAddress_key" ON "User"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Quote_id_key" ON "Quote"("id");

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
