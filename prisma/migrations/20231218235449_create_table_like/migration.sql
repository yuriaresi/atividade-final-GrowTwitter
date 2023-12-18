-- CreateTable
CREATE TABLE "like" (
    "id" TEXT NOT NULL,
    "usuario_id" VARCHAR(100) NOT NULL,
    "tweet_id" VARCHAR(100) NOT NULL,
    "dt_hr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_hr_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "like_pkey" PRIMARY KEY ("id")
);
