/*
  Warnings:

  - You are about to drop the column `order_id` on the `order_products` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `order_products` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `order_products` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `payment_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `receipt_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `total_paid` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `total_return` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[receiptId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `order_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `order_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `order_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiptId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPaid` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalReturn` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_products" DROP CONSTRAINT "order_products_order_id_fkey";

-- DropForeignKey
ALTER TABLE "order_products" DROP CONSTRAINT "order_products_product_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- DropIndex
DROP INDEX "orders_receipt_id_key";

-- AlterTable
ALTER TABLE "order_products" DROP COLUMN "order_id",
DROP COLUMN "product_id",
DROP COLUMN "total_price",
ADD COLUMN     "orderId" INTEGER NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "created_at",
DROP COLUMN "payment_id",
DROP COLUMN "receipt_id",
DROP COLUMN "total_paid",
DROP COLUMN "total_price",
DROP COLUMN "total_return",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "paymentId" INTEGER NOT NULL,
ADD COLUMN     "receiptId" TEXT NOT NULL,
ADD COLUMN     "totalPaid" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalReturn" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "category_id",
DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "categoryId" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "full_name",
ADD COLUMN     "fullName" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orders_receiptId_key" ON "orders"("receiptId");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
