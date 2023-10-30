const path = require('path')
const Contatos = require(path.join(__dirname, '..', '..', 'database', 'controller', 'controllercontatos.js'))


class ControllerContatos360 {
    constructor() {
        this.contatos = new Contatos()
    }
    getUsuarioCadastradoNumero(numero) {
        return new Promise((resolve, reject) => {
            this.contatos.getContatosMulti({
                numero: numero
            }).then((res) => {
                if (Object.keys(res).length != 0) {
                    resolve(true)
                }
                else {
                    resolve(false)
                }
            }).catch((e) => {
                reject(e)
            })
        })
    }
}

module.exports = ControllerContatos360;

// const Teste = new ControllerContatos360()

// Teste.getUsuarioCadastradoNumero('11961776581').then((_) => { console.log(_) }).catch((_) => { console.log(_) })