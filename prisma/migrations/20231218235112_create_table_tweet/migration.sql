/*
  Warnings:

  - Added the required column `dt_hr_atualizacao` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "Dt_hr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dt_hr_atualizacao" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "tweet" (
    "id" TEXT NOT NULL,
    "usuario_id" VARCHAR(100) NOT NULL,
    "conteudo" TEXT NOT NULL,
    "tipo_tweet" CHAR(1) NOT NULL,
    "dt_hr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_hr_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tweet_pkey" PRIMARY KEY ("id")
);
