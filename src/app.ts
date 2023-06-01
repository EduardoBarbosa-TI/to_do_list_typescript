import express from 'express'
import routes from './routes/User'
import 'dotenv/config'
import { Pool } from 'pg'
import './shared/services/TranslationsYup'

class App {
    public express: express.Application
    private pool: Pool

    constructor() {
        this.pool = new Pool({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_DB_HOST,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: 5432,
        })
        this.express = express()
        this.middlewares()
        this.routes()
        this.database()
    }

    private middlewares(): void {
        this.express.use(express.json())
    }

    private async database(): Promise<void> {
        const client = await this.pool.connect();

        try {
            console.log('Conexão com o banco de dados estabelecida com sucesso.')
        } catch(error) {
            
            console.error('Erro ao conectar-se ao banco de dados:', error)
        }
    }

    private routes(): void {
        this.express.use(routes)
    }
}

export default new App().express 