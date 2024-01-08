/*
  Warnings:

  - The primary key for the `like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `like` table. All the data in the column will be lost.
  - You are about to drop the column `tweet_id` on the `like` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_id` on the `like` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_id` on the `tweet` table. All the data in the column will be lost.
  - The required column `idTweet` was added to the `like` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `id_usuario` to the `like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_usuario` to the `tweet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "like" DROP CONSTRAINT "like_pkey",
DROP COLUMN "id",
DROP COLUMN "tweet_id",
DROP COLUMN "usuario_id",
ADD COLUMN     "idTweet" UUID NOT NULL,
ADD COLUMN     "id_usuario" UUID NOT NULL,
ADD CONSTRAINT "like_pkey" PRIMARY KEY ("idTweet");

-- AlterTable
ALTER TABLE "tweet" DROP COLUMN "usuario_id",
ADD COLUMN     "id_usuario" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "tweet" ADD CONSTRAINT "tweet_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_idTweet_fkey" FOREIGN KEY ("idTweet") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
