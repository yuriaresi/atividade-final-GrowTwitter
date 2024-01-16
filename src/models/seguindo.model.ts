
import { randomUUID } from "crypto";
import { Usuario } from "./usuario.model";

export class Seguindo {
    id: string;
    constructor(public idSeguindo: Usuario, public idUsuario: string) {
        this.id = randomUUID()
    }

}