/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `barang` DROP FOREIGN KEY `Barang_perusahaan_id_fkey`;

-- DropForeignKey
ALTER TABLE `barangwithperusahaan` DROP FOREIGN KEY `BarangWithPerusahaan_barang_id_fkey`;

-- DropForeignKey
ALTER TABLE `barangwithperusahaan` DROP FOREIGN KEY `BarangWithPerusahaan_perusahaan_id_fkey`;

-- DropIndex
DROP INDEX `BarangWithPerusahaan_id_key` ON `barangwithperusahaan`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- AddForeignKey
ALTER TABLE `Barang` ADD CONSTRAINT `Barang_perusahaan_id_fkey` FOREIGN KEY (`perusahaan_id`) REFERENCES `Perusahaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BarangWithPerusahaan` ADD CONSTRAINT `BarangWithPerusahaan_barang_id_fkey` FOREIGN KEY (`barang_id`) REFERENCES `Barang`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BarangWithPerusahaan` ADD CONSTRAINT `BarangWithPerusahaan_perusahaan_id_fkey` FOREIGN KEY (`perusahaan_id`) REFERENCES `Perusahaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
