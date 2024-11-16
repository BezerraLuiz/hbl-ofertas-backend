/*
  Warnings:

  - The `id` column on the `Produtos` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Produtos" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL;
