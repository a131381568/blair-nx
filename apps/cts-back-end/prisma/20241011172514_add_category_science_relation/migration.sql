-- AlterTable
ALTER TABLE "science" ADD COLUMN     "post_category_nanoid" VARCHAR(10);

-- CreateIndex
CREATE INDEX "science_post_category_nanoid_idx" ON "science"("post_category_nanoid");
