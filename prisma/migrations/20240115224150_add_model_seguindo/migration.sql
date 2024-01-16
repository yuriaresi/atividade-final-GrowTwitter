-- CreateTable
CREATE TABLE "seguindo" (
    "id" UUID NOT NULL,
    "id_seguindo" UUID NOT NULL,
    "id_usuario" UUID NOT NULL,

    CONSTRAINT "seguindo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "seguindo" ADD CONSTRAINT "seguindo_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
