-- CreateTable
CREATE TABLE "_CategoryToMeet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToMeet_AB_unique" ON "_CategoryToMeet"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToMeet_B_index" ON "_CategoryToMeet"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToMeet" ADD FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToMeet" ADD FOREIGN KEY ("B") REFERENCES "Meet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
