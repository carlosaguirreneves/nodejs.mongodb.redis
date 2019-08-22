import {Startup} from './startup'
import { MigrationController } from './controller/migration-controller';

let startup = new Startup();
startup.bootstrap().then(() => {
    new MigrationController().start().then(() => {
        console.log(`Processo finalizado com sucesso`)
        process.exit(0)
    }).catch(err => {
        console.log('Erro no processo de migração (worker)', err)
        process.exit(1)
    });
}).catch(error => {
    console.log('Server failed to start')
    console.error(error)
    process.exit(1)
})