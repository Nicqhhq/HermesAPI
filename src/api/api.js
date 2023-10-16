const Menssager = require('../controller/whatsapp/messenger')

class Middleware {
    constructor() {
        this.menssager = new Menssager();
    }
    enviaMensagem(req, res) {
        const numero = req.query.numero;
        const mensagem = req.query.mensagem;
        this.menssager.enviaMensagem(numero, mensagem).then((_) => {
            res.status(200).json({ mensagem: _ })
        }).catch((_) => { res.status(400).json({ mensagem: _ }) })

    }
}

module.exports = Middleware;