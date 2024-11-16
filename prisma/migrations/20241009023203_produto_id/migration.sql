/*
  Warnings:

  - The primary key for the `Produtos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `codProduto` on the `Produtos` table. All the data in the column will be lost.
  - Added the required column `id` to the `Produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produtos" DROP CONSTRAINT "Produtos_pkey",
DROP COLUMN "codProduto",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Produtos_pkey" PRIMARY KEY ("id");
