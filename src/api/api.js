const Menssager = require('../controller/whatsapp/messenger')

class Middleware {
    constructor() {
        this.menssager = new Menssager();
    }
    enviaMensagem(req, res) {
        console.log("passou no middlware")
        const corpo = req.body;
        this.menssager.enviaMensagem(corpo['numero'], corpo['nome']).then((_) => {
            console.log("passou");
            res.status(200).json({ mensagem: _ })
        }).catch((_) => {
            console.log("não passou ", _);
            res.status(400).json({ mensagem: _ })
        })

    }
}

module.exports = Middleware;