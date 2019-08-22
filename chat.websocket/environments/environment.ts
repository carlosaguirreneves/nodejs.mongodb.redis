import * as yargs from 'yargs'
import * as envDev from './environment.dev';
import * as envHom from './environment.hom';
import * as envProd from './environment.prod';

export class Environment {

    public getEnv() {
        let envStage = envDev.environment

        try {
            const argv = yargs
                .alias('env', 'environment')
                .argv

            if (argv.environment === 'prod') {
                envStage = envProd.environment
            } else if (argv.environment === 'hom') {
                envStage = envHom.environment
            }
        } catch (ex) {
            console.error(ex)
            throw new Error(`Não foi possível recuperar as variaveis de ambiente. ${ex}`)
        }

        return envStage
    }
}

export const environment = new Environment().getEnv()