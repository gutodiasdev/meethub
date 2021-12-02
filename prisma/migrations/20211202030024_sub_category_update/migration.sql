/*
  Warnings:

  - You are about to drop the `_CategoryToSubCategory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[categoryId]` on the table `SubCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `SubCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToSubCategory" DROP CONSTRAINT "_CategoryToSubCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToSubCategory" DROP CONSTRAINT "_CategoryToSubCategory_B_fkey";

-- AlterTable
ALTER TABLE "SubCategory" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CategoryToSubCategory";

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_categoryId_key" ON "SubCategory"("categoryId");

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
