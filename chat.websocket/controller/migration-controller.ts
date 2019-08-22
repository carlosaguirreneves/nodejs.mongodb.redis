import * as moment from 'moment'
import { QueueRedis } from '../infrastructure/queue-redis';

export class MigrationController {

    public start() {
        return new Promise((resolve, reject) => {
            console.log(`Start Worker iniciado em ${moment().format('DD/MM/YYYY H:mm:ss')}`)
            this.getNextMessage()
        })
    }

    getNextMessage() {
        setTimeout(() => {
            let queueName = QueueRedis.getInstance().name
            let queue = QueueRedis.getInstance().getQueue()
            console.log("entrou....")
            queue.popMessageAsync({qname: queueName}).then((resp) =>{
                if (resp['id']) {
                    console.log("Message received:", resp)	
                }
                else {
                    console.log("No messages for me...")
                }

                this.getNextMessage()
            }).catch(err => {
                console.log('Erro ao tentar receber a mensagem', err)
                this.getNextMessage()
            });
            console.log("passou aqui...")
        }, 500)
    }
}