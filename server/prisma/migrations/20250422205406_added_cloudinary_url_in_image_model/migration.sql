/*
  Warnings:

  - Added the required column `cloudinary_url` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "cloudinary_url" TEXT NOT NULL;
