import { NextFunction, Request, Response } from "express";
import { errorServidor } from "../util/response.helper";
import { nextTick } from "process";
import repository from "../database/prisma.ripository";

export async function validaLogMiddlewares(req: Request, res: Response, next: NextFunction) {
    try {
        const { authorization } = req.headers
        const { id } = req.params

        if (!authorization) {
            return res.status(401).send(
                {
                    ok: false,
                    message: 'Token de autenticação nao informado'
                }
            )
        }


        const usuario = await repository.usuario.findUnique({ where: { id } })

        if (!usuario || usuario.token !== authorization) {
            return res.status(401).send(
                {
                    ok: false,
                    message: 'Token de autenticação invalido'
                }
            )
        }



        next()
    } catch (error: any) {
        errorServidor(res, error)

    }
}