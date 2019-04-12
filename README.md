# LookAfter™ - Diapers

## Estrutura
Utilizei o docker para desenvolver as aplicações, onde segmentei na seguinte estrutura:

  - API
    - NodeJS 10
    - Express
    - Body-Parser
    - Node-Couch
  - APP
    - Angular 7
    - Angular Material
  - DB
    - CouchDB

## Alguns comentários

> Ao iniciar a API, coloquei uma validação para criar os databases no banco, caso não existão

> Entendi que minha tarefa era desenvolver um sistema, onde o usuário administrador, registraria o estoque de fraldas.

> No site para o cliente final poderia realizar a compra dessas fraldas

> Decidi salvar a data que o administrador cadastra o estoque, para ter uma base de tempo para utilizar no cálculo da estimativa de tempo para zerar o estoque

> Este cálculo é uma simples regra de 3 com as somas das diferenças entre as horas das compras, multiplica isso com os itens restantes e divide tudo pelo total de itens vendidos

## Alguns passos para rodar o back end
Para rodar o back end, basta ter o NodeJS 10 instalado na máquina ou o Docker.
Acessar a pasta raiz do projeto e rodar o comando:
  - Com NodeJS:
    - `cd api/; node api`
  - Com Docker:
    - `docker-compose up -d lookafter_api`

## Alguns passos para gerar o build do front
Para rodar o front end, precisa ter o NodeJS 10 e o @angular/cli no npm global ou o Docker.
Acessar a pasta raiz do projeto e rodar o comando:
  - Com NodeJS e @angular/cli:
    - `cd app/; ng build lookafter`
  - Com Docker:
    - `docker-compose up -d lookafter_app_dev`

## Alguns passos para rodar o build do front
Para rodar o serviço do front end, precisa ter Nginx 1.15 instalado ou o Docker.
Acessar a pasta raiz do projeto e seguir as seguintes instruções:
  - Com Nginx:
    - Configurar no lookafter.conf o caminho para os arquivos da dist
    - `cd app/; ln -s lookafter.conf /etc/nginx/sites-available/lookafter.conf`
    - `nginx -s reload`
  - Com Docker:
    - `docker-compose up -d lookafter_app_server`

## Alguns passos para rodar o banco de dados
Para rodar o banco de dados, precisa ter o CouchDB 2.3.1 ou o Docker.
Siga as instruções:
  - Com o CouchDB:
    - Definir usuário e senha
    - Alterar no arquivo api/services/db.js, o host, o usuário e a senha
  - Com o Docker:
    - `docker-compose up -d lookafter_db`

## Para rodar todos pelo Docker
É possível rodar todos os serviços diretamente pelo Docker, para isso execute o comando abaixo:
  - `docker-compose up -d`