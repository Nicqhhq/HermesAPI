const Menssager = require('../controller/whatsapp/messenger')

class Middleware {
    constructor() {
        this.menssager = new Menssager();
    }
    enviaMensagem(req, res) {
        const corpo = req.body;
        this.menssager.enviaMensagem(corpo['numero'], corpo['mensagem']).then((_) => {
            res.status(200).json({ mensagem: _ })
        }).catch((_) => { res.status(400).json({ mensagem: _ }) })

    }
}

module.exports = Middleware;