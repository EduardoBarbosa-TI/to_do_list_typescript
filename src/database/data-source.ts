import { DataSource } from "typeorm";
import 'dotenv/config'
import { User } from "../entidades/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_DB_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})


