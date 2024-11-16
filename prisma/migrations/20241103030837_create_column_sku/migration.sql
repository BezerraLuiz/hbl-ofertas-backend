/*
  Warnings:

  - The primary key for the `Produtos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `sku` to the `Produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produtos" DROP CONSTRAINT "Produtos_pkey",
ADD COLUMN     "sku" TEXT NOT NULL;
