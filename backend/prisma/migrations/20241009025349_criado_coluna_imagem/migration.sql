/*
  Warnings:

  - Added the required column `imagem` to the `Produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produtos" ADD COLUMN     "imagem" TEXT NOT NULL;
