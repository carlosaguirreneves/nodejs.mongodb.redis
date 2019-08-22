export class Util {

    /**
     * Implementa um novo replacer para JSON.stringify. 
     * Uso: JSON.stringify(new Error('mensagem de erro'), parseErrorToJson).
     */
    public static parseErrorToJson (key: String, value: Error) {
        if (value instanceof Error) {
            var error = {};
            Object.getOwnPropertyNames(value).forEach(function (key) {
                error[key] = value[key];
            });
            return error;
        }
        return value;
    }

    /**
     * Formata um stacktrace do tipo Error para o formato JSON stringify.
     * @param {Error da mensagem stackstrace} error
     */
    public static formatErrorToJson (error: Error) {
        return JSON.stringify(error, this.parseErrorToJson);
    }
}