import { randomUUID } from "crypto";

export class Usuario {
    public id: string;
    public nome: string;
    public nomeUsuario: string;
    public email: string;
    public senha: string;
    public image: string;

    constructor(nome: string, nomeUsuario: string, email: string, senha: string, image: string = 'https://static.vecteezy.com/system/resources/previews/009/267/561/non_2x/user-icon-design-free-png.png') {
        this.id = randomUUID()
        this.nome = nome
        this.nomeUsuario = nomeUsuario
        this.email = email
        this.senha = senha
        this.image = image

    }
}