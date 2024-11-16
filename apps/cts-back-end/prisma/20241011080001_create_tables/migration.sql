-- CreateTable
CREATE TABLE "about_info" (
    "visual" VARCHAR,
    "slogan" VARCHAR,
    "philosophy" TEXT,
    "quote" TEXT,
    "epilogue" TEXT,
    "about_id" SERIAL NOT NULL,

    CONSTRAINT "about_info_pkey" PRIMARY KEY ("about_id")
);

-- CreateTable
CREATE TABLE "facilities_list" (
    "facilities_orderid" SERIAL NOT NULL,
    "facilities_title" VARCHAR,
    "facilities_description" TEXT,
    "facilities_image" VARCHAR,
    "facilities_link" VARCHAR,
    "published" BOOLEAN,

    CONSTRAINT "facilities_list_pkey" PRIMARY KEY ("facilities_orderid")
);

-- CreateTable
CREATE TABLE "observatories_list" (
    "id" SERIAL NOT NULL,
    "observatoryNanoId" VARCHAR(10) NOT NULL DEFAULT nanoid(10),
    "observatory_orderid" INTEGER NOT NULL,
    "observatory_category_name" VARCHAR,
    "observatory_category_id" VARCHAR,
    "observatory_post_content" TEXT,
    "published" BOOLEAN,

    CONSTRAINT "observatories_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_info" (
    "page_title" VARCHAR,
    "sub_page_title" VARCHAR,
    "page_route" VARCHAR,
    "page_id" SERIAL NOT NULL,

    CONSTRAINT "page_info_pkey" PRIMARY KEY ("page_id")
);

-- CreateTable
CREATE TABLE "post_categories" (
    "post_category_orderid" SERIAL NOT NULL,
    "post_category_name" VARCHAR,
    "post_category_id" VARCHAR,
    "published" BOOLEAN,

    CONSTRAINT "post_categories_pkey" PRIMARY KEY ("post_category_orderid")
);

-- CreateTable
CREATE TABLE "science" (
    "orderid" SERIAL NOT NULL,
    "postid" INTEGER,
    "title" VARCHAR,
    "categoryid" VARCHAR,
    "updatetime" DATE,
    "content" TEXT,
    "image" VARCHAR,
    "published" BOOLEAN,

    CONSTRAINT "science_pkey" PRIMARY KEY ("orderid")
);

-- CreateTable
CREATE TABLE "stargazing_list" (
    "stargazing_orderid" SERIAL NOT NULL,
    "stargazing_title" VARCHAR,
    "stargazing_latitude" DECIMAL(18,15),
    "stargazing_longitude" DECIMAL(18,15),
    "stargazing_image" VARCHAR,
    "stargazing_description" TEXT,
    "stargazing_address" VARCHAR,
    "stargazing_link" VARCHAR,
    "published" BOOLEAN,
    "stargazing_lid" VARCHAR,

    CONSTRAINT "stargazing_list_pkey" PRIMARY KEY ("stargazing_orderid")
);

-- CreateTable
CREATE TABLE "users" (
    "orderid" SERIAL NOT NULL,
    "uid" INTEGER,
    "name" VARCHAR,
    "email" VARCHAR,
    "password" VARCHAR,

    CONSTRAINT "users_pkey" PRIMARY KEY ("orderid")
);

-- CreateIndex
CREATE UNIQUE INDEX "observatories_list_observatoryNanoId_key" ON "observatories_list"("observatoryNanoId");

-- CreateIndex
CREATE UNIQUE INDEX "observatories_list_observatory_orderid_key" ON "observatories_list"("observatory_orderid");

-- CreateIndex
CREATE UNIQUE INDEX "unique_page_id" ON "page_info"("page_id");
