-- CreateTable
CREATE TABLE "public"."FileInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "coords" JSONB NOT NULL,

    CONSTRAINT "FileInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Record" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "time" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fileInfoId" INTEGER NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Record" ADD CONSTRAINT "Record_fileInfoId_fkey" FOREIGN KEY ("fileInfoId") REFERENCES "public"."FileInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
