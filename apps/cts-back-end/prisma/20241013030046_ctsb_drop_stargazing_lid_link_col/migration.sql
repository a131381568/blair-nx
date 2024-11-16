/*
  Warnings:

  - You are about to drop the column `stargazing_lid` on the `stargazing_list` table. All the data in the column will be lost.
  - You are about to drop the column `stargazing_link` on the `stargazing_list` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "stargazing_list" DROP COLUMN "stargazing_lid",
DROP COLUMN "stargazing_link";
