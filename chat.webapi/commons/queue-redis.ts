import { environment } from './environments/environment';
import * as RedisSMQ from 'rsmq'

export class QueueRedis {

    private static _instance = null
    private _queue: RedisSMQ

    public getQueue() {
        return this._queue
    }

    public get name(): string {
        return environment.queue.name
    }

    public static getInstance(): QueueRedis {
        if (this._instance == null) {
            this._instance = new QueueRedis()
            this._instance._queue = new RedisSMQ({
                host: environment.queue.host,
                port: environment.queue.port, 
                ns: 'rsmq'
            })
        }

        return this._instance
    }

    public createQueueAsync(): Promise<QueueRedis> {
        return new Promise((resolve, reject) => {
            console.log('Esperando conexão com o Redis.')
            this._queue.createQueueAsync({
                qname: this.name,
                vt: environment.queue.vt
            }).then((resp) => {
                if (resp === 1) {
                    console.log('Conexão com Redis realizado.')
                    resolve(this)
                }
            }).catch(err => {
                if (err.name === 'queueExists') {
                    console.log('Conexão com Redis realizado.')
                    resolve(this)
                } else {
                    console.log('createQueueAsync', err)
                    reject({message: `Não foi possível criar uma nova fila ${err}`})
                }
            });
        })
    }
}