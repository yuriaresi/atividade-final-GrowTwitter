import express, { Request, Response, request } from "express";
import cors from 'cors';
import { UsuarioController } from "./controllers/user.controller";
import { TweetController } from "./controllers/tweet.controller";

const app = express();
app.use(express.json());
app.use(cors());

const usuarioController = new UsuarioController()
const tweetController = new TweetController()

//usuario

app.post('/usuario', usuarioController.criarUsuario)

app.get('/usuario/:id', usuarioController.buscarUsuario)

app.get('/usuario', usuarioController.listarUsuarios)

// tweet

app.post('/usuario/:id/tweet', tweetController.criarTweet)



app.listen(3333, () => {
    console.log("A API está rodando!- http://localhost:3333");
});