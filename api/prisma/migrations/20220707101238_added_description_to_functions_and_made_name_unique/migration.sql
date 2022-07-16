/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Function` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Function` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Function` ADD COLUMN `description` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Function_name_key` ON `Function`(`name`);
