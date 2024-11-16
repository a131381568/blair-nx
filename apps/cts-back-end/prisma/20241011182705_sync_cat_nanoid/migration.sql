/*
  Warnings:

  - You are about to drop the column `postCategoryNanoId` on the `post_categories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[post_category_nanoid]` on the table `post_categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "post_categories_postCategoryNanoId_key";

-- AlterTable
ALTER TABLE "post_categories" DROP COLUMN "postCategoryNanoId",
ADD COLUMN     "post_category_nanoid" VARCHAR(10) NOT NULL DEFAULT nanoid(10);

-- CreateIndex
CREATE UNIQUE INDEX "post_categories_post_category_nanoid_key" ON "post_categories"("post_category_nanoid");
