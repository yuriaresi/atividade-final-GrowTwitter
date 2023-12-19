import { randomUUID } from "crypto";

export class Tweet {
    id: string;
    usuarioId: string;
    conteudo: string;
    tipoTweet: string;

    constructor(usuarioId: string, conteudo: string, tipoTweet: string) {
        this.id = randomUUID()
        this.usuarioId = usuarioId
        this.conteudo = conteudo
        this.tipoTweet = tipoTweet
    }
}