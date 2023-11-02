-- CreateEnum
CREATE TYPE "ProductsStatus" AS ENUM ('PENDIENTE', 'ENTREGADO', 'CANCELADO');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "productsStatus" "ProductsStatus";

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "time" TEXT NOT NULL DEFAULT 'Hace un momento',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);
