/*
  Warnings:

  - Added the required column `roles` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'mentor';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roles" "Role" NOT NULL;
