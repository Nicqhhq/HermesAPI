const { PrismaClient } = require('@prisma/client');
const path = require('path');
const log = require(path.join(__dirname, '..', '..', 'logs', 'configlog.js'));
const Logdb = require(path.join(__dirname, 'controllerlogs.js'))
const logdb = new Logdb()
const prisma = new PrismaClient();

module.exports = class ControllerContatos {

    async getContatosMulti(parametros) {
        const iso8601DateTime = (new Date()).toISOString()
        const { nome, email, numero, unidade } = parametros;
        return new Promise(async (resolve, reject) => {
            await prisma.contatos.findMany({
                where: {
                    contato_nome: nome,
                    contato_email: email,
                    contato_numero: numero,
                    contato_unidade: unidade
                }
            }).then((_) => {
                if (Object.keys(_).length != 0) {
                    log.gravaLog(`Usuario Consultado: ID: ${_[0]['id']} Nome:${_[0]['contato_nome']}`)
                    logdb.InsertLog({
                        tipo: 'INFO',
                        horario: iso8601DateTime,
                        info: `Usuario Consultado: ID: ${_[0]['id']} Nome: ${_[0]['contato_nome']}`
                    })
                }
                resolve(_)
            }).catch((_) => {
                log.gravaLog(`Erro ao consultar usuario: ${_}`),
                    logdb.InsertLog({
                        tipo: 'ERRO',
                        horario: iso8601DateTime,
                        info: `Erro ao consultar usuario: ${_}`
                    })
                reject(_)
            })
        })
    }
    async InsertContato(parametros) {
        const iso8601DateTime = (new Date()).toISOString()
        const { nome, email, numero, unidade } = parametros;
        return new Promise(async (resolve, reject) => {
            await prisma.contatos.create({
                data: {
                    contato_nome: nome,
                    contato_email: email,
                    contato_numero: numero,
                    contato_unidade: unidade,
                    contato_ativo: true
                }
            }).then((_) => {
                log.gravaLog(`Usuario inserido no banco: ID: ${_[0]['id']} Nome: ${_[0]['contato_nome']}`),
                    logdb.InsertLog({
                        tipo: 'INFO',
                        horario: iso8601DateTime,
                        info: `Usuario inserido no banco: ID: ${_[0]['id']} Nome: ${_[0]['contato_nome']}`
                    })
                resolve(_)
            }).catch((_) => {
                log.gravaLog(`erro ao inserir usuario no banco: ${_}`),
                    logdb.InsertLog({
                        tipo: 'ERRO',
                        horario: iso8601DateTime,
                        info: `erro ao inserir usuario no banco: ${_}`
                    })
                reject(_)
            })
        })
    }
    async updateContato(parametros) {
        const iso8601DateTime = (new Date()).toISOString()
        const { id, nome, email, numero, unidade, ativo } = parametros;
        return new Promise(async (resolve, reject) => {
            await prisma.contatos.update({
                where: {
                    id: id
                },
                data: {
                    contato_nome: nome,
                    contato_email: email,
                    contato_numero: numero,
                    contato_unidade: unidade,
                    contato_ativo: ativo
                }
            }).then((_) => {
                log.gravaLog(`Usuario atualizado no banco: ID: ${_[0]['id']} NOME: ${_[0]['contato_nome']}`),
                    logdb.InsertLog({
                        tipo: 'INFO',
                        horario: iso8601DateTime,
                        info: `Usuario atualizado no banco: ID: ${_[0]['id']} NOME: ${_[0]['contato_nome']}`
                    })
                resolve(_)
            }).catch((_) => {
                log.gravaLog(`Erro ao atualizar usuario no banco: ${_}`),
                    logdb.InsertLog({
                        tipo: 'ERRO',
                        horario: iso8601DateTime,
                        info: `Erro ao atualizar usuario no banco: ${_}`
                    })
                reject(_)
            })
        })
    }
}