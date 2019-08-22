export const environmentHom = {
    stage: 'hom',
    production: false,
    server: {
        port: process.env.SERVER_PORT || 3000
    },
    queue: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: parseInt(process.env.REDIS_PORT) || 6379,
        name: process.env.REDIS_NAME || 'chatweb',
        vt: parseInt(process.env.REDIS_VT) || 60
    },
    db: {
        host: process.env.DB_HOST || 'mongodb://127.0.0.1/chatweb',
        user: process.env.DB_USER || 'root',
        pwd: process.env.DB_PWD || 'example'
    }
}