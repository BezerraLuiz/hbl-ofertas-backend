/*
  Warnings:

  - You are about to drop the column `imagePath` on the `Products` table. All the data in the column will be lost.
  - Added the required column `imageId` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "imagePath",
ADD COLUMN     "imageId" TEXT NOT NULL;
