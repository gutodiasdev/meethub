/*
  Warnings:

  - You are about to drop the column `descritption` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "descritption",
ADD COLUMN     "description" TEXT;
