import * as yargs from 'yargs'
import * as envDev from './environment.dev';
import * as envHom from './environment.hom';
import * as envProd from './environment.prod';

export class Environment {

    public getEnv() {
        let envStage = envDev.environmentDev

        try {
            const argv = yargs
                .alias('env', 'environment')
                .argv

            let stage = argv.environment || process.env.STAGE

            if (stage === 'prod') {
                envStage = envProd.environmentProd
            } else if (stage === 'hom') {
                envStage = envHom.environmentHom
            }
        } catch (error) {
            console.error(error)
            throw new Error(`Não foi possível recuperar as variaveis de ambiente. ${error}`)
        }

        return envStage
    }
}

export const environment = new Environment().getEnv()