import { environment } from '../environments/environment';
import { Pool, PoolConfig, PoolClient, Client } from 'pg'

class PostgresConnectionPool {
    private pool: Pool;

    constructor() { }

    public createConnectionPool(): Promise<any> {
        class ConnectionConfig implements PoolConfig { }

        return new Promise((resolve, reject) => {
            let configPool:PoolConfig = new ConnectionConfig()
        
            configPool.database = environment.db.postgres.database
            configPool.host = environment.db.postgres.host
            configPool.user = environment.db.postgres.user
            configPool.password = environment.db.postgres.password
            configPool.max = environment.db.postgres.connectionLimit
            configPool.idleTimeoutMillis = environment.db.postgres.idleTimeout
            configPool.connectionTimeoutMillis = environment.db.postgres.connectionTimeout
    
            this.pool = new Pool(configPool);
    
            this.pool.on('connect', () => {
                console.log('pool => conexão estabelecida.')
            });
            this.pool.on('acquire', () => {
                //console.log('pool => conexão adquirida.')
            }); 
            this.pool.on('remove', () => {
                //console.log('pool => conexão retornada ao pool.')
            });

            this.pool.on('error', (err, client) => {
                console.error(`Erro inesperado no cliente inativo. ${client}`, err)
            })

            this.getConnection().then((client) => {
                client.release()
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    }

    public getPool(): Pool {
        return this.pool;
    }

    public getConnection() : Promise<PoolClient> {
        return new Promise((resolve, reject) => {
            if (this.pool == null) {
                reject({message: 'Pool de conexões não foi encontrado (Postgres).'})
            }

            this.pool.connect((err, poolClient: PoolClient) => {
                if (err) {
                    reject({message: `Não foi possível conectar com o banco (Postgres). ${err}`})
                }
                
                resolve(poolClient)
            })
        })
    }
}

export const postgresConn = new PostgresConnectionPool();