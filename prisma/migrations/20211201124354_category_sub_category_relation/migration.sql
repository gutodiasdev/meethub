/*
  Warnings:

  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoriesToUserPreferences` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubCategories" DROP CONSTRAINT "SubCategories_category_id_fkey";

-- DropForeignKey
ALTER TABLE "_CategoriesToUserPreferences" DROP CONSTRAINT "_CategoriesToUserPreferences_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoriesToUserPreferences" DROP CONSTRAINT "_CategoriesToUserPreferences_B_fkey";

-- DropTable
DROP TABLE "Categories";

-- DropTable
DROP TABLE "SubCategories";

-- DropTable
DROP TABLE "_CategoriesToUserPreferences";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToUserPreferences" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToSubCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToUserPreferences_AB_unique" ON "_CategoryToUserPreferences"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToUserPreferences_B_index" ON "_CategoryToUserPreferences"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToSubCategory_AB_unique" ON "_CategoryToSubCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToSubCategory_B_index" ON "_CategoryToSubCategory"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToUserPreferences" ADD FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToUserPreferences" ADD FOREIGN KEY ("B") REFERENCES "UserPreferences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToSubCategory" ADD FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToSubCategory" ADD FOREIGN KEY ("B") REFERENCES "SubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
