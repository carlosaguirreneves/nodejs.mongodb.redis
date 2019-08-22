export const environment = {
    stage: 'prod',
    production: true,
    queue: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: parseInt(process.env.REDIS_PORT) || 6379,
        name: process.env.REDIS_NAME || 'chatbase',
        vt: parseInt(process.env.REDIS_VT) || 60
    },
    db: {
        mongoDB: {
            host: process.env.DB_HOST || '127.0.0.1',
            port: parseInt(process.env.DB_PORT) || 3050,
            database: process.env.DB_DATABASE || 'base',
            user: process.env.DB_USER || 'chat',
            password: process.env.DB_PASSWORD || '123456'
        }
    }
}