import { environment } from '../commons/environments/environment';
import { QueueRedis } from '../commons/queue-redis';
import * as restify from 'restify'
import { Router } from '../commons/router';
import * as mongoose from 'mongoose';

export class Startup {
    
    application: restify.Server

    initEnv(): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log({stage: environment.stage}, {production: environment.production})
            resolve()
        })
    }

    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'chat-webapi',
                    version: '1.0.0'
                })

                this.application.use(restify.plugins.queryParser())

                for (let router of routers) {
                    router.applyRoutes(this.application)
                }

                this.application.listen(environment.server.port, () => {
                    resolve(this.application)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    initDb(): Promise<any> {
        (<any>mongoose).Promise = global.Promise
        console.log('Conectando com o MongoDB')
        return mongoose.connect(environment.db.host, {
            useNewUrlParser: true
        })
    }

    initQueueRedis(): Promise<any> {
        return QueueRedis.getInstance().createQueueAsync()
    }

    bootstrap(routers: Router[] = []): Promise<Startup> {
        return this.initEnv().then(() => 
                this.initRoutes(routers).then(() => 
                this.initQueueRedis().then(() =>
                this.initDb().then(() => this))));
    }
}