import { environment } from './environments/environment';
import { postgresConn } from './infrastructure/postgres-connection-pool';

export class Startup {
    
    initEnv(): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log({stage: environment.stage}, {production: environment.production})
            resolve()
        })
    }

    initializePostgreSQL(): Promise<any> {
        return postgresConn.createConnectionPool()
    }

    bootstrap(): Promise<Startup> {
        return this.initEnv().then(() => 
                this.initializePostgreSQL().then(() => this))
    }
}