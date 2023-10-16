const ClientWhatsapp = require('./whatsappcontroller.js')
class sendMessage {
    constructor() {
        this.cliente = new ClientWhatsapp()
    }
    enviaMensagem(numero, mensagem) {
        const data = new Date
        return new Promise((resolve, reject) => {
            if (this.cliente.clientUp == false) {
                console.log("Cliente nao disponivel, tentando novamente em 10 segundos")
                setTimeout(() => {
                    this.enviaMensagem(`${numero}`, mensagem)
                }, 10000)
            }
            else {
                this.cliente.client.sendMessage(`55${numero}@c.us`, ` ${mensagem}`).then((_) => {
                    resolve(`Mensagem Enviada para o numero : ${numero}`)
                }).catch((_) => {
                    reject(`erro ao enviar mensagem para o numero ${numero} erro: `, _)
                })
            }
        })
    }
}
module.exports = sendMessage;
