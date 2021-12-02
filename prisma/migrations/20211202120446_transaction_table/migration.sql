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
    "meetEnrollmentId" TEXT NOT NULL,

    CONSTRAINT "MeetTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MeetTransaction_meetEnrollmentId_key" ON "MeetTransaction"("meetEnrollmentId");

-- AddForeignKey
ALTER TABLE "MeetTransaction" ADD CONSTRAINT "MeetTransaction_meetEnrollmentId_fkey" FOREIGN KEY ("meetEnrollmentId") REFERENCES "MeetEnrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
