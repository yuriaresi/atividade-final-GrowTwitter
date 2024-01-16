-- AddForeignKey
ALTER TABLE "seguindo" ADD CONSTRAINT "seguindo_id_seguindo_fkey" FOREIGN KEY ("id_seguindo") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
