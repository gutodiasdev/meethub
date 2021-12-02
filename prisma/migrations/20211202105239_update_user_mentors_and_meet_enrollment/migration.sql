-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "mentorId" TEXT;

-- AlterTable
ALTER TABLE "Mentor" ADD COLUMN     "token" TEXT;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
