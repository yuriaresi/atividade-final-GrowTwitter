import { Request, Response } from "express";
import repository from "../database/prisma.ripository";
import { erroNaoEncontrado, errorServidor } from "../util/response.helper";
import { adaptUsuarioPrisma } from "../util/usuario.adapter";
import { Seguindo } from "../models/seguindo.model";

export class SeguindoController {

    public async seguir(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { idSeguindo } = req.body;

            if (id === idSeguindo) {
                return res.status(400).send({
                    ok: false,
                    message: "Você não pode se seguir.",
                });
            }

            const usuario = await repository.usuario.findUnique({ where: { id } });

            if (!usuario) {
                return erroNaoEncontrado(res, 'usuario');
            }

            const verificarSeguindo = await repository.usuario.findUnique({ where: { id: idSeguindo } });

            if (!verificarSeguindo) {
                return erroNaoEncontrado(res, 'usuario');
            }


            const jaSeguindo = await repository.seguindo.findFirst({
                where: {
                    idUsuario: usuario.id,
                    idSeguindo: idSeguindo,
                },
            });

            if (jaSeguindo) {

                await repository.seguindo.delete({
                    where: {
                        id: jaSeguindo.id,
                    },
                });

                return res.status(200).send({
                    ok: true,
                    message: `Você parou de seguir ${verificarSeguindo?.nomeUsuario}`,
                });
            }


            const seguindoId = adaptUsuarioPrisma(verificarSeguindo);
            const novoSeguidor = new Seguindo(seguindoId, id);

            const result = await repository.seguindo.create({
                data: {
                    idSeguindo: novoSeguidor.idSeguindo.id,
                    idUsuario: usuario.id,
                    nickSeguindo: novoSeguidor.idSeguindo.nomeUsuario,
                    nickUsuario: usuario.nomeUsuario,
                },
            });

            return res.status(201).send({
                ok: true,
                message: `Você começou a seguir ${verificarSeguindo?.nomeUsuario}`,
            });
        } catch (error: any) {
            errorServidor(res, error);
        }
    }


    public async mostrarSeguidores(req: Request, res: Response) {
        try {

            const { id } = req.params

            const result = await repository.usuario.findUnique({ where: { id }, include: { seguindo: true, seguidores: true } })

            if (!result) { return erroNaoEncontrado(res, 'usuario') }



            return res.status(201).send({ ok: true, message: result })

        } catch (error: any) {
            errorServidor(res, error)

        }
    }
}