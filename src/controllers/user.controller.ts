import { Request, Response } from "express";
import repository from "../database/prisma.ripository";
import { erroNaoEncontrado, errorServidor } from "../util/response.helper";
import { Usuario } from "../models/usuario.model";

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

            const usuario = new Usuario(nome, nomeUsuario, email, senha)
            await repository.usuario.create({
                data: usuario
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
                    where: { id },
                    include: { tweets: true, seguindo: true, seguidores: true }
                }
            )

            if (!usuario) {
                return erroNaoEncontrado(res, 'Usuario')
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

    public async listarUsuarios(req: Request, res: Response) {

        try {
            const result = await repository.usuario.findMany()

            if (Usuario.length === 0) {
                return erroNaoEncontrado(res, 'Usuario')
            }

            return res.status(201).send({
                ok: true,
                data: result
            })

        } catch (error: any) {
            errorServidor(error, res)

        }
    }

    public async deletarUsuario(req: Request, res: Response) {
        try {

            const { id } = req.params

            const result = await repository.usuario.findUnique({ where: { id } })

            if (!result) { return (res.status(404).send({ ok: false, message: erroNaoEncontrado(res, 'usuario') })) }

            await repository.usuario.delete({ where: { id } })

            return res.status(201).send({ ok: true, message: 'Usuario deletado com sucesso.' })
        }



        catch (error: any) {
            errorServidor(res, error)

        }
    }

    public async editarUsuario(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { nome, nomeUsuario, image } = req.body

            if (!nome && !nomeUsuario) {
                return res.status(400).send(
                    {
                        ok: false,
                        message: 'Informe ao menos um campo para atualizar'
                    }
                )
            };

            const usuario = await repository.usuario.findUnique({ where: { id } })

            if (!usuario) {
                return (res.status(404).send({ ok: false, message: erroNaoEncontrado(res, 'usuario') }))
            }

            let usuarioAtualizado = { nome, nomeUsuario }

            

            const result = await repository.usuario.update({
                where: { id },
                data: { nome, nomeUsuario, image }
            })

            return res.status(201).send({
                ok: true,
                message: 'Usuario atualizado com sucesso',
            })



        }

        catch (error: any) {
            errorServidor(res, error)

        }
    }

    // public async alterarImagem(req: Request, res: Response) {
    //     try {
    //         const { id } = req.params
    //         const { image } = req.body

    //         const result = await repository.usuario.findUnique({ where: { id } })

    //         if (!result) {
    //             return (erroNaoEncontrado(res, 'usuario'))
    //         }

    //         const editImage = await repository.usuario.update({
    //             where: { id },
    //             data: { image }
    //         })

    //         return (
    //             res.status(201).send({
    //                 ok: true,
    //                 message: 'Imagem alterada com sucesso'
    //             })
    //         )

    //     } catch (erro: any) {
    //         errorServidor(erro, res)

    //     }
    // }

}

