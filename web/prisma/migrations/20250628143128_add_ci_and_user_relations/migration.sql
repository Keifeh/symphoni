/*
  Warnings:

  - You are about to drop the `ConfiguredItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `originUserId` to the `Incident` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CiClass" AS ENUM ('Laptop', 'Desktop', 'Mobile_Phone', 'Tablet');

-- DropForeignKey
ALTER TABLE "ConfiguredItem" DROP CONSTRAINT "ConfiguredItem_incidentId_fkey";

-- DropForeignKey
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_assignedToId_fkey";

-- AlterTable
ALTER TABLE "Incident" ADD COLUMN     "originUserId" TEXT NOT NULL,
ALTER COLUMN "assignedToId" DROP NOT NULL;

-- DropTable
DROP TABLE "ConfiguredItem";

-- CreateTable
CREATE TABLE "ConfigurationItem" (
    "id" SERIAL NOT NULL,
    "sysId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ciClass" "CiClass" NOT NULL,
    "ciOwnerId" TEXT,
    "incidentId" TEXT,

    CONSTRAINT "ConfigurationItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConfigurationItem_sysId_key" ON "ConfigurationItem"("sysId");

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_originUserId_fkey" FOREIGN KEY ("originUserId") REFERENCES "User"("sysId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("sysId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfigurationItem" ADD CONSTRAINT "ConfigurationItem_ciOwnerId_fkey" FOREIGN KEY ("ciOwnerId") REFERENCES "User"("sysId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfigurationItem" ADD CONSTRAINT "ConfigurationItem_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("sysId") ON DELETE SET NULL ON UPDATE CASCADE;
