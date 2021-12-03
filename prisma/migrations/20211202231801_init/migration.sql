-- CreateEnum
CREATE TYPE "Role" AS ENUM ('administrator', 'user');

-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('user', 'mentor');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "position" TEXT,
    "biography" TEXT,
    "permissions" "Permission" NOT NULL DEFAULT E'user',
    "token" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "meetDetails" TEXT,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Meet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetEnrollment" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roles" "Role" NOT NULL,
    "room" TEXT,
    "userId" TEXT NOT NULL,
    "meetId" TEXT NOT NULL,
    "meetTransactionId" TEXT,

    CONSTRAINT "MeetEnrollment_pkey" PRIMARY KEY ("userId","meetId")
);

-- CreateTable
CREATE TABLE "MeetTransaction" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "refse_reason" TEXT NOT NULL,
    "status_reason" TEXT NOT NULL,
    "acquirer_response_code" TEXT NOT NULL,
    "acquirer_name" TEXT NOT NULL,
    "acquirer_id" TEXT NOT NULL,
    "authorization_code" TEXT NOT NULL,
    "date_created" TEXT NOT NULL,
    "date_updated" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "authorized_amount" INTEGER NOT NULL,
    "paid_amount" INTEGER NOT NULL,
    "refunded_amount" INTEGER NOT NULL,
    "installments" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "card_holder_name" TEXT NOT NULL,
    "card_last_digits" TEXT NOT NULL,
    "card_first_digits" TEXT NOT NULL,
    "card_brand" TEXT NOT NULL,
    "card_pin_mode" TEXT NOT NULL,
    "postback_url" TEXT NOT NULL,
    "payment_method" TEXT NOT NULL,
    "capture_method" TEXT NOT NULL,
    "antifraud_score" TEXT NOT NULL,
    "boleto_url" TEXT NOT NULL,
    "boleto_barcode" TEXT NOT NULL,
    "boleto_expiration_date" TEXT NOT NULL,
    "referer" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "MeetTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

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
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT NOT NULL,
    "meetId" TEXT NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToUserPreferences" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "MeetEnrollment_userId_roles_idx" ON "MeetEnrollment"("userId", "roles");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userId_key" ON "UserPreferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_categoryId_key" ON "SubCategory"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_meetId_key" ON "Reviews"("meetId");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToUserPreferences_AB_unique" ON "_CategoryToUserPreferences"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToUserPreferences_B_index" ON "_CategoryToUserPreferences"("B");

-- AddForeignKey
ALTER TABLE "MeetEnrollment" ADD CONSTRAINT "MeetEnrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetEnrollment" ADD CONSTRAINT "MeetEnrollment_meetId_fkey" FOREIGN KEY ("meetId") REFERENCES "Meet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetEnrollment" ADD CONSTRAINT "MeetEnrollment_meetTransactionId_fkey" FOREIGN KEY ("meetTransactionId") REFERENCES "MeetTransaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_meetId_fkey" FOREIGN KEY ("meetId") REFERENCES "Meet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToUserPreferences" ADD FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToUserPreferences" ADD FOREIGN KEY ("B") REFERENCES "UserPreferences"("id") ON DELETE CASCADE ON UPDATE CASCADE;
