/*
  Warnings:

  - You are about to drop the column `date` on the `unusual_times` table. All the data in the column will be lost.
  - Added the required column `close` to the `unusual_times` table without a default value. This is not possible if the table is not empty.
  - Added the required column `open` to the `unusual_times` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "unusual_times_date_key";

-- AlterTable
ALTER TABLE "unusual_times" DROP COLUMN "date",
ADD COLUMN     "close" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "open" TIMESTAMP(3) NOT NULL;
