/*
  Warnings:

  - You are about to alter the column `sku` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "sku" SET DATA TYPE VARCHAR(50);
