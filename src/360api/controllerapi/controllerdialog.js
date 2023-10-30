const instancia = require('../api.js')
const path = require('path');
const ControllerContatos = require(path.join(__dirname, '..', 'controllercontatos', 'controllercontatos.js'))
const Logdb = require(path.join(__dirname, '..', '..', 'database', 'controller', 'controllerlogs.js'))
class DialogController {
    constructor() {
        this.contatos = new ControllerContatos()
        this.logdb = new Logdb()
    }
    async routeSendTemplate(req, res) {
        const parameters = req.body
        this.SendTemplate(parameters)
            .then((_) => {
                res.status(200).json({
                    template: `${parameters['nometemplate']}`,
                    numeroDestino: `${parameters['numero']}`,
                })
                this.logdb.InsertLog({ tipo: 'INFO', info: `template ${parameters['nometemplate']} enviado para o numero ${parameters['numero']}` })
            })
            .catch((_) => {
                res.status(404).json({ mensagem: _ })
                this.logdb.InsertLog({ tipo: 'ERRO', info: `erro ao enviar template ${parameters['nometemplate']} para o numero ${parameters['numero']} erro: ${_}` })
            })

    }
    async SendTemplate(parameters) {
        const { numero, nometemplate, parametros } = parameters;
        const cadastrado = await this.contatos.getUsuarioCadastradoNumero(numero)
        return new Promise((resolve, reject) => {
            cadastrado ?
                instancia({
                    url: '/messages',
                    method: 'POST',
                    data: {
                        "messaging_product": "whatsapp",
                        "recipient_type": "individual",
                        "to": numero,
                        "type": "template",
                        "template": {
                            "name": nometemplate,
                            "language": {
                                "code": "pt_BR"
                            },
                            "components": [
                                {
                                    "type": "BODY",
                                    "parameters": [
                                        parametros
                                    ]
                                }
                            ]
                        }
                    },
                }).then((res) => {
                    resolve(res.data)
                }).catch((e) => {
                    reject(e)
                })
                : reject(`numero nao cadastrado: ${numero}`)
        })

    }

}
module.exports = DialogController;