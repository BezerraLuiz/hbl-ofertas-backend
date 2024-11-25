/*
  Warnings:

  - A unique constraint covering the columns `[mail]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Users_mail_key" ON "Users"("mail");
