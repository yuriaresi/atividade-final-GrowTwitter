import express from "express";
import cors from 'cors';
import { UsuarioController } from "./controllers/user.controller";
import { TweetController } from "./controllers/tweet.controller";
import { AuthController } from "./controllers/auth.controller";

const app = express();
app.use(express.json());
app.use(cors());

const usuarioController = new UsuarioController()
const tweetController = new TweetController()
const authcontroller = new AuthController()




//usuario

app.post('/usuario', usuarioController.criarUsuario)

app.get('/usuario/:id', usuarioController.buscarUsuario)

app.get('/usuario', usuarioController.listarUsuarios)

app.delete('/usuario/:id', usuarioController.deletarUsuario)

app.put('/usuario/:id', usuarioController.editarUsuario)

// tweet

app.post('/usuario/:id/tweet', tweetController.criarTweet)

app.get('/tweets', tweetController.listarTweets)

app.delete('/tweet/:id', tweetController.deletarTweets)

app.put('/tweet/:id', tweetController.editarTweets)

//login

app.post('/login', authcontroller.login)



app.listen(3333, () => {
    console.log("A API está rodando!- http://localhost:3333");
});