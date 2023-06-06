import { DataSource } from "typeorm";
import 'dotenv/config'
import { User } from "../entidades/User";
import { Tag, Task } from "../entidades";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_DB_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: true,
    entities: [User,Task,Tag],
    subscribers: [],
    migrations: [],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Conexão estabelecida!")
    })
    .catch((err) => {
        console.error("Erro durante a inicialização do banco de dados", err)
    })
