/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ConfigurationItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ConfigurationItem_name_key" ON "ConfigurationItem"("name");
