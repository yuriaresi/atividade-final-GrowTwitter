import { Request, Response } from "express";
import { erroCampoNaoInformado, erroNaoEncontrado, errorServidor } from "../util/response.helper";
import repository from "../database/prisma.ripository";
import { adaptUsuarioPrisma } from "../util/usuario.adapter";
import { Tweet } from "../models/tweet.model";

export class TweetController {

    public async criarTweet(req: Request, res: Response) {
        try {
            //-1 entrada
            const { id } = req.params
            const { conteudo } = req.body
            const { authorization } = req.headers

            if (!conteudo) {
                return erroCampoNaoInformado(res)
            }

            if (!authorization) {
                res.status(400).send(
                    {
                        ok: false,
                        message: 'Token de autenticação não informado.'
                    }
                )
            }

            //-2 processamento

            const usuario = await repository.usuario.findUnique({
                where: { id }
            })

            if (!usuario) {
                return erroNaoEncontrado(res, 'Usuario')
            }

            if (usuario.token !== authorization) {
                res.status(401).send(
                    {
                        ok: false,
                        message: 'Token invalido'
                    }
                )
            }


            const usuarioBackend = adaptUsuarioPrisma(usuario)

            const tweet = new Tweet(usuarioBackend, conteudo, "T")

            const result = await repository.tweet.create({
                data: {
                    idUsuario: tweet.usuarioId.id,
                    conteudo: tweet.conteudo,
                    tipoTweet: tweet.tipoTweet
                }
            })
            //-3 saida

            return res.status(201).send({
                ok: true,
                message: 'Tweet criado com sucesso',
                data: result
            })

        } catch (error) {
            errorServidor(res, error)
        }
    }

    public async listarTweets(req: Request, res: Response) {
        try {
            const result = await repository.tweet.findMany(
                {
                    include: { usuarioId: true }
                }
            )
            console.log(result)
            if (result.length === 0) {
                return { ok: false, data: [] }
            }
            return res.status(201).send({
                ok: true,
                data: result
            })


        } catch (error: any) {
            return res.status(500).send(
                {
                    ok: false,
                    message: error.toString()
                }
            )
        }
    }


    public async deletarTweets(req: Request, res: Response) {
        try {
            const { id } = req.params

            const result = await repository.tweet.findUnique(
                { where: { id } }
            )

            if (!result) {
                return res.status(404).send({
                    ok: false,
                    message: 'Tweet não encontrado'
                })
            }

            await repository.tweet.delete({ where: { id } })

            return res.status(201).send({ ok: true, message: 'Tweet deletado com sucesso.' })

        } catch (error: any) {
            return res.status(500).send(
                {
                    ok: false,
                    message: error.toString()
                }
            )
        }
    }

    public async editarTweets(req: Request, res: Response) {
        try {

            const { id } = req.params
            const { conteudo } = req.body

            if (!conteudo) {
                return res.status(400).send(
                    {
                        ok: false,
                        message: 'Preencha o campo'
                    }
                )
            };

            const tweet = await repository.tweet.findUnique({ where: { id } })

            if (!tweet) { return res.status(404).send({ ok: false, message: erroNaoEncontrado(res, 'Tweet') }) }

            const result = await repository.tweet.update({ where: { id }, data: { conteudo } })

            return res.status(201).send({ ok: true, message: 'Tweet atualizado com sucesso.' })

        } catch (error: any) {
            errorServidor(res, error)

        }
    }

    public async buscarTweetId(req: Request, res: Response) {
        try {
            const { id } = req.params

            const result = await repository.tweet.findUnique({ where: { id } })

            if (!result) { return res.status(404).send(erroNaoEncontrado(res, 'Tweet')) }

            return res.status(201).send({ ok: true, message: result })

        } catch (error: any) {
            errorServidor(res, error)

        }
    }

    public async buscarTweetUsuario(req: Request, res: Response) {
        try {
            const { id } = req.params

            const result = await repository.usuario.findUnique({ where: { id }, include: { tweets: true } })
            if (!result) {
                return (
                    { ok: false, message: erroNaoEncontrado(res, 'usuario') }
                )
            }

            return (res.status(201).send({
                ok: true,
                data: result.tweets
            }))




        } catch (error: any) {
            errorServidor(error, res)

        }
    }
}