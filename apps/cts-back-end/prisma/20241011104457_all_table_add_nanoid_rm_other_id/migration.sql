/*
  Warnings:

  - The primary key for the `observatories_list` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `observatories_list` table. All the data in the column will be lost.
  - You are about to drop the column `postid` on the `science` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[facilitiesNanoId]` on the table `facilities_list` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pageNanoId]` on the table `page_info` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postCategoryNanoId]` on the table `post_categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postNanoId]` on the table `science` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stargazingNanoId]` on the table `stargazing_list` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nanoId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "observatories_list_observatory_orderid_key";

-- AlterTable
ALTER TABLE "facilities_list" ADD COLUMN     "facilitiesNanoId" VARCHAR(10) NOT NULL DEFAULT nanoid(10);

-- AlterTable
CREATE SEQUENCE observatories_list_observatory_orderid_seq;
ALTER TABLE "observatories_list" DROP CONSTRAINT "observatories_list_pkey",
DROP COLUMN "id",
ALTER COLUMN "observatory_orderid" SET DEFAULT nextval('observatories_list_observatory_orderid_seq'),
ADD CONSTRAINT "observatories_list_pkey" PRIMARY KEY ("observatory_orderid");
ALTER SEQUENCE observatories_list_observatory_orderid_seq OWNED BY "observatories_list"."observatory_orderid";

-- AlterTable
ALTER TABLE "page_info" ADD COLUMN     "pageNanoId" VARCHAR(10) NOT NULL DEFAULT nanoid(10);

-- AlterTable
ALTER TABLE "post_categories" ADD COLUMN     "postCategoryNanoId" VARCHAR(10) NOT NULL DEFAULT nanoid(10);

-- AlterTable
ALTER TABLE "science" DROP COLUMN "postid",
ADD COLUMN     "postNanoId" VARCHAR(10) NOT NULL DEFAULT nanoid(10);

-- AlterTable
ALTER TABLE "stargazing_list" ADD COLUMN     "stargazingNanoId" VARCHAR(10) NOT NULL DEFAULT nanoid(10);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "uid",
ADD COLUMN     "nanoId" VARCHAR(10) NOT NULL DEFAULT nanoid(10);

-- CreateIndex
CREATE UNIQUE INDEX "facilities_list_facilitiesNanoId_key" ON "facilities_list"("facilitiesNanoId");

-- CreateIndex
CREATE UNIQUE INDEX "page_info_pageNanoId_key" ON "page_info"("pageNanoId");

-- CreateIndex
CREATE UNIQUE INDEX "post_categories_postCategoryNanoId_key" ON "post_categories"("postCategoryNanoId");

-- CreateIndex
CREATE UNIQUE INDEX "science_postNanoId_key" ON "science"("postNanoId");

-- CreateIndex
CREATE UNIQUE INDEX "stargazing_list_stargazingNanoId_key" ON "stargazing_list"("stargazingNanoId");

-- CreateIndex
CREATE UNIQUE INDEX "users_nanoId_key" ON "users"("nanoId");
