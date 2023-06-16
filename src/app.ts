import express from 'express'
import 'dotenv/config'
import './shared/services/TranslationsYup'
import "reflect-metadata"
import routesUser from './routes/User'
import routesTask from './routes/Task'
import routesTag from './routes/Tag'
import { AppDataSource } from './data-source'

class App {
    public express: express.Application

    constructor() {
        this.database()
        this.express = express()
        this.middlewares()
        this.routes()
    }

    private middlewares(): void {
        this.express.use(express.json())
    }

    private async database(): Promise<void> {
        AppDataSource.initialize()
            .then(() => {
                console.log("Conexão estabelecida!")
            })
            .catch((err) => {
                console.error("Erro durante a inicialização do banco de dados", err)
            })
    }

    private routes(): void {
        this.express.use(routesUser)
        this.express.use(routesTask)
        this.express.use(routesTag)
    }
}

export default new App().express 