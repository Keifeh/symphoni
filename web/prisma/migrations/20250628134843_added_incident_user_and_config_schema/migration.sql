/*
  Warnings:

  - A unique constraint covering the columns `[sysId]` on the table `Incident` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `assignedToId` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - The required column `sysId` was added to the `Incident` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "IncidentStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'ON_HOLD', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "ImpactLevel" AS ENUM ('Low', 'Medium', 'High');

-- CreateEnum
CREATE TYPE "UrgencyLevel" AS ENUM ('Low', 'Medium', 'High');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "Incident" ADD COLUMN     "assignedToId" TEXT NOT NULL,
ADD COLUMN     "impact" "ImpactLevel" NOT NULL DEFAULT 'Low',
ADD COLUMN     "status" "IncidentStatus" NOT NULL DEFAULT 'OPEN',
ADD COLUMN     "sysId" TEXT NOT NULL,
ADD COLUMN     "urgency" "UrgencyLevel" NOT NULL DEFAULT 'Low';

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "sysId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfiguredItem" (
    "id" SERIAL NOT NULL,
    "sysId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "incidentId" TEXT NOT NULL,

    CONSTRAINT "ConfiguredItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_sysId_key" ON "User"("sysId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ConfiguredItem_sysId_key" ON "ConfiguredItem"("sysId");

-- CreateIndex
CREATE UNIQUE INDEX "Incident_sysId_key" ON "Incident"("sysId");

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("sysId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfiguredItem" ADD CONSTRAINT "ConfiguredItem_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("sysId") ON DELETE RESTRICT ON UPDATE CASCADE;
