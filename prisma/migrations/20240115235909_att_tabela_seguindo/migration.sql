/*
  Warnings:

  - A unique constraint covering the columns `[id_seguindo]` on the table `seguindo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "seguindo_id_seguindo_key" ON "seguindo"("id_seguindo");
