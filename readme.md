Growtitter
O Growtitter é uma aplicação de simulação do twitter. Este projeto oferece diversas rotas para diferentes funcionalidades e pode ser executado com o comando npm run dev.

Instalação
Clone este repositório: git clone https://github.com/yuriaresi/atividade-final-GrowTwitter.git
Navegue até o diretório do projeto: cd atividade final GrowTwitter
Instale as dependências: npm install
Certifique-se de ter o Node.js e o npm instalados na sua máquina.

Uso
Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

npm run dev

O servidor será iniciado em http://localhost:3333 por padrão.

Rotas Disponíveis
POST /usuario
Descrição: Cria um novo usuário na plataforma.
Controlador: usuarioController.criarUsuario
GET /usuario/:id
Descrição: Busca e retorna as informações do usuário com o ID correspondente.
Controlador: usuarioController.buscarUsuario
GET /usuario
Descrição: Retorna uma lista de todos os usuários cadastrados.
Controlador: usuarioController.listarUsuarios
POST /usuario/:id/tweet
Descrição: Cria um novo tweet para o usuário com o ID correspondente.
Controlador: tweetController.criarTweet
POST /login
Descrição: Realiza o login do usuário na plataforma.
Controlador: authController.login
Certifique-se de substituir :id pelos valores correspondentes ao utilizar as rotas dinâmicas.