import express from "express";
import cors from 'cors';
import { UsuarioController } from "./controllers/user.controller";
import { TweetController } from "./controllers/tweet.controller";
import { AuthController } from "./controllers/auth.controller";
import { SeguindoController } from "./controllers/seguindo.controller";
import { validaLogMiddlewares } from "./middlewares/login.middlewares";
import * as dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const usuarioController = new UsuarioController()
const tweetController = new TweetController()
const authcontroller = new AuthController()
const seguindoController = new SeguindoController()




//usuario

app.post('/usuario', usuarioController.criarUsuario)
app.get('/usuario/:id', [validaLogMiddlewares], usuarioController.buscarUsuario)
app.get('/usuario', usuarioController.listarUsuarios)
app.delete('/usuario/:id', usuarioController.deletarUsuario)
app.put('/usuario/:id', [validaLogMiddlewares], usuarioController.editarUsuario)
app.post('/usuario/:id')

// tweet

app.post('/usuario/:id/tweet', [validaLogMiddlewares], tweetController.criarTweet)
app.get('/tweets', tweetController.listarTweets)
app.delete('/tweet/:id', [validaLogMiddlewares], tweetController.deletarTweets)
app.put('/tweet/:id', [validaLogMiddlewares], tweetController.editarTweets)
app.get('/tweet/:id' , tweetController.buscarTweetId)
app.get('/usuario/:id/tweet', [validaLogMiddlewares], tweetController.buscarTweetUsuario)

//login

app.post('/login', authcontroller.login)

// seguir

app.post('/seguir/:id', seguindoController.seguir)

// tem a mesma funcionalidade que a rota buscar usuarios.

app.get('/seguidores/:id', seguindoController.mostrarSeguidores)

//

app.listen(process.env.PORT, () => {
    console.log("A API está rodando!- http://localhost:3333");
});