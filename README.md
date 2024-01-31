# Como executar o projeto:

cd app-poesias
docker compose up
cd src
node app.js

acesse http://localhost:3000/main


# Para abrir o bash do db:

docker-compose exec postgres psql -U postgres 
\l # para listar bancos de dados
\c poesias # para conectar ao db poesias 

# Sobre o projeto:

O projeto possui um backend em node com banco de dados postgres; e um frontend (view) minimo (não concluído, faltando as seções de interação com poesias), feito majoritariamente com injeções de js. 

A ideia do Poesias App é que você pode cadastrar um autor (usuario), logar, e cada autor tem suas poesias (produtos). desta forma, cada poesia deve ter somente um autor, podendo somente este edita-las e exclui-las. 

ATENÇÃO:

Não faria muito sentido as poesias possuirem imagens, portanto, deixei esta opção para fotos dos autores.

Pode-se verificar a lista de autores e baixar as fotos na sessão Autores (botão). 

Para isto, ao cadastrar um autor (botão Cadastrar Autor), anteriormente deve-se fazer o upload da imagem.

