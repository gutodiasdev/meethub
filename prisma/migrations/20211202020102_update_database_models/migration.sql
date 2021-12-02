/*
  Warnings:

  - You are about to drop the column `meet_id` on the `Reviews` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_profile_id` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the `Meets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rooms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProfile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[meetId]` on the table `Reviews` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `UserPreferences` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `meetId` to the `Reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserPreferences` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Meets" DROP CONSTRAINT "Meets_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_meet_id_fkey";

-- DropForeignKey
ALTER TABLE "Rooms" DROP CONSTRAINT "Rooms_meet_id_fkey";

-- DropForeignKey
ALTER TABLE "UserPreferences" DROP CONSTRAINT "UserPreferences_user_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_user_id_fkey";

-- DropIndex
DROP INDEX "Reviews_meet_id_key";

-- DropIndex
DROP INDEX "UserPreferences_user_profile_id_key";

-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "meet_id",
ADD COLUMN     "meetId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "created_at",
ADD COLUMN     "biography" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "position" TEXT;

-- AlterTable
ALTER TABLE "UserPreferences" DROP COLUMN "user_profile_id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Meets";

-- DropTable
DROP TABLE "Rooms";

-- DropTable
DROP TABLE "UserProfile";

-- CreateTable
CREATE TABLE "Mentor" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "position" TEXT,
    "biography" TEXT,
    "roles" "Role" NOT NULL DEFAULT E'mentor',

    CONSTRAINT "Mentor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "meetDetails" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Meet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetEnrollment" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roles" "Role" NOT NULL,
    "room" TEXT,
    "userId" TEXT NOT NULL,
    "meetId" TEXT NOT NULL,

    CONSTRAINT "MeetEnrollment_pkey" PRIMARY KEY ("userId","meetId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mentor_email_key" ON "Mentor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Meet_user_id_key" ON "Meet"("user_id");

-- CreateIndex
CREATE INDEX "MeetEnrollment_userId_roles_idx" ON "MeetEnrollment"("userId", "roles");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_meetId_key" ON "Reviews"("meetId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userId_key" ON "UserPreferences"("userId");

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meet" ADD CONSTRAINT "Meet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetEnrollment" ADD CONSTRAINT "MeetEnrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetEnrollment" ADD CONSTRAINT "MeetEnrollment_meetId_fkey" FOREIGN KEY ("meetId") REFERENCES "Meet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_meetId_fkey" FOREIGN KEY ("meetId") REFERENCES "Meet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
