import { Request, Response } from "express";
import repository from "../database/prisma.ripository";
import { erroCampoNaoInformado, errorServidor } from "../util/response.helper";

export class UsuarioController {

    public async criarUsuario(req: Request, res: Response) {
        try {
            //-1 entrada
            const { nome, nomeUsuario, email, senha } = req.body




            //-2 processamento

            if (!nome || !nomeUsuario || !email || !senha) {
                return res.status(400).send({
                    ok: false,
                    message: 'Preencha todos os campos.'
                })
            }

            await repository.usuario.create({
                data: { nome, nomeUsuario, email, senha }
            })

            //-3 saida

            return res.status(201).send(
                {
                    ok: true,
                    message: `Usuario ${nomeUsuario} criado com sucesso `
                }
            )

        } catch (error) {
            errorServidor(res, error)
        }
    }

    public async buscarUsuario(req: Request, res: Response) {
        try {
            //-1 entrada
            const { id } = req.params

            //-2 processamento

            const usuario = await repository.usuario.findUnique(
                {
                    where: { id }
                }
            )

            if (!usuario) {
                return { message: 'Usuario nao encontrado' }
            }

            //-3 saida

            return res.status(201).send({
                ok: true,
                message: 'Usuario encontrado com sucesso',
                data: usuario
            })

        } catch (error: any) {
            errorServidor(res, error)

        }
    }




}