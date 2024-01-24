
import { erroCampoNaoInformado, errorServidor } from "../util/response.helper";
import repository from "../database/prisma.ripository";
import { randomUUID } from "crypto";
import { Request, Response } from "express";
import { Usuario } from "../models/usuario.model";

export class AuthController {
    public async login(req: Request, res: Response) {
        try {

            //-1 entrada



            const { email, senha } = req.body

            if (!email || !senha) {
                return erroCampoNaoInformado(res)
            }

            //-2 processamento
            const usuario = await repository.usuario.findFirst({
                where: { email, senha },
                select: { id: true, nome: true, image: true, nomeUsuario: true }
            })

            if (!usuario) {
                return res.status(401).send(
                    {
                        ok: false,
                        message: 'Credenciais inválidas'
                    }
                )
            }



            const token = randomUUID()

            await repository.usuario.update({
                where: { id: usuario.id },
                data: {
                    token
                }
            })
            //-3 saida

            return res.status(201).send({
                ok: true,
                message: 'Login realizado com sucesso',
                data: {
                    id: usuario.id,
                    nome: usuario.nome,
                    token,
                    image: usuario.image,
                    nomeUsuario: usuario.nomeUsuario
                }
            })

        } catch (error: any) {
            errorServidor(res, error)
        }
    }
}
