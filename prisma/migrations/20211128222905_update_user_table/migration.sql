/*
  Warnings:

  - You are about to drop the column `role` on the `UserProfile` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('administrator', 'user', 'mentor');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Roles" NOT NULL DEFAULT E'user';

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "role";

-- DropEnum
DROP TYPE "UserRole";
