const { PrismaClient } = require('@prisma/client');
const path = require('path');
const log = require(path.join(__dirname, '..', '..', 'logs', 'configlog.js'));
const prisma = new PrismaClient();

module.exports = class ControllerLogs {

    async getLogsMulti(parametros) {
        const { tipo, horario } = parametros;
        return new Promise(async (resolve, reject) => {
            await prisma.log.findMany({
                where: {
                    log_tipo: tipo,
                    log_horario: horario,
                }
            }).then((_) => {
                log.gravaLog(`log Consultado: ID: ${_.id}`)
                resolve(_)
            }).catch((_) => {
                log.gravaLog(`Erro ao consultar log: ${_}`),
                    reject(_)
            })
        })
    }
    async InsertLog(parametros) {
        const { tipo, info } = parametros;
        const iso8601DateTime = (new Date()).toISOString()
        return new Promise(async (resolve, reject) => {
            await prisma.log.create({
                data: {
                    log_tipo: tipo,
                    log_info: info,
                    log_horario: iso8601DateTime
                }
            }).then((_) => {
                log.gravaLog(`Log inserido no banco: ID: ${_.id} tipo: ${_.log_tipo}`),
                    resolve(_)
            }).catch((_) => {
                log.gravaLog(`erro ao inserir log no banco: ${_}`, _),
                    reject(_)
            })
        })
    }

}