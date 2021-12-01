/*
  Warnings:

  - You are about to drop the column `user_preferences_id` on the `Categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_user_preferences_id_fkey";

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "user_preferences_id";

-- CreateTable
CREATE TABLE "_CategoriesToUserPreferences" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriesToUserPreferences_AB_unique" ON "_CategoriesToUserPreferences"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriesToUserPreferences_B_index" ON "_CategoriesToUserPreferences"("B");

-- AddForeignKey
ALTER TABLE "_CategoriesToUserPreferences" ADD FOREIGN KEY ("A") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriesToUserPreferences" ADD FOREIGN KEY ("B") REFERENCES "UserPreferences"("id") ON DELETE CASCADE ON UPDATE CASCADE;
