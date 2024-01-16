-- AlterTable
ALTER TABLE "seguindo" ADD COLUMN     "nick_seguindo" VARCHAR(50) NOT NULL DEFAULT 'default_value',
ADD COLUMN     "nick_usuario" VARCHAR(50) NOT NULL DEFAULT 'default_value';
