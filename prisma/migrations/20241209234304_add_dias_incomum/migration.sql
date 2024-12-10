-- CreateTable
CREATE TABLE "unusual_times" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "unusual_times_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unusual_times_date_key" ON "unusual_times"("date");
