/*
  Warnings:

  - You are about to drop the column `user_id` on the `Meet` table. All the data in the column will be lost.
  - The primary key for the `MeetEnrollment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `biography` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mentorId]` on the table `Meet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mentorId` to the `Meet` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `MeetEnrollment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `mentorId` to the `MeetEnrollment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Meet" DROP CONSTRAINT "Meet_user_id_fkey";

-- DropIndex
DROP INDEX "Meet_user_id_key";

-- DropIndex
DROP INDEX "MeetEnrollment_userId_roles_idx";

-- AlterTable
ALTER TABLE "Meet" DROP COLUMN "user_id",
ADD COLUMN     "mentorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MeetEnrollment" DROP CONSTRAINT "MeetEnrollment_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "mentorId" TEXT NOT NULL,
ADD CONSTRAINT "MeetEnrollment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "biography",
DROP COLUMN "image",
DROP COLUMN "name",
DROP COLUMN "position",
ALTER COLUMN "roles" SET DEFAULT E'user';

-- CreateIndex
CREATE UNIQUE INDEX "Meet_mentorId_key" ON "Meet"("mentorId");

-- AddForeignKey
ALTER TABLE "Meet" ADD CONSTRAINT "Meet_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetEnrollment" ADD CONSTRAINT "MeetEnrollment_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
