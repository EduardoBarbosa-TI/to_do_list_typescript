# to-do list
Consolidando o conhecimento em node.js com typescript e postgreSQL, projeto criado com base nos cursos realizados.

### Sobre
Esse projeto foi passado como desafio e foi fundamental para um entendimento mais profundo sobre typescript e node.js. Aliás é no aperto que realmente colocamos em prática nossos conhecimentos.

### Pré-requisitos
Antes de começar, você vai precisar ter uma conexão com o banco de dados postgreSQL. Utilizei uma imagem docker do [postgreSQL](https://hub.docker.com/_/postgres). Não esqueça de renomear o arquivo .env.example, retirando o '.example', e configurar as variáveis de ambiente da conexão do banco de dados e as demais.

### 🎲 Rodando o Back End (servidor)

```bash
#Startando imagem postgreSQL no docker 
$ docker pull postgres
$ docker run -p 5432:5432 -v /tmp/database:/var/lib/postgresql/data -e POSTGRES_PASSWORD=root postgres

# Clone este repositório
$ git clone <https://github.com/EduardoBarbosa-TI/to_do_list_typescript.git>

# Instale as dependências
$ npm install || yarn install

# Realize a migration das tabelas e adicione um usuário padrão
$ npm seed || yarn seed

# Execute a aplicação em modo de desenvolvimento
$ npm start || yarn start

# O servidor inciará na port:8000 || default:3333
```
