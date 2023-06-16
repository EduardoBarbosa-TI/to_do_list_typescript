import { DataSource, DataSourceOptions } from "typeorm";
import 'dotenv/config'
import { SeederOptions } from "typeorm-extension";
import { MainSeeder } from "./database/seeds/MainSeeder";

export const optionsDBPostgres: DataSourceOptions & SeederOptions = {
    type: "postgres",
    host: process.env.POSTGRES_DB_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: true,
    entities: [`${__dirname}/**/entities/*.{ts,js}`],  
	migrations: [`${__dirname}/**/database/migrations/*.{ts,js}`], 
    seeds: [MainSeeder]
} 

export const AppDataSource = new DataSource(optionsDBPostgres)
