/*
  Warnings:

  - You are about to drop the column `changePercentage` on the `ExpenseByCategory` table. All the data in the column will be lost.
  - Added the required column `amount` to the `ExpenseByCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `ExpenseByCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExpenseByCategory" DROP COLUMN "changePercentage",
ADD COLUMN     "amount" BIGINT NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PurchaseSummary" ALTER COLUMN "changePercentage" DROP NOT NULL;
