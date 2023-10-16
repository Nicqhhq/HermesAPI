const { Client, Location, List, Buttons, LocalAuth } = require('whatsapp-web.js');

var qrcode = require('qrcode-terminal');
class ClientWhatsapp {
    constructor() {
        this.client = new Client({
            authStrategy: new LocalAuth(),
            puppeteer: { headless: true }
        });
        this.client.initialize()
        this.clientUp = false;

        this.client.on('loading_screen', (percent, message) => {
            console.log('Tela de carregamento', percent, message);
        });

        this.client.on('qr', (qr) => {
            console.log('QR RECEIVED', qr);
            qrcode.generate(qr, { small: true })
        });

        this.client.on('authenticated', () => {
            console.log('WhatsApp Autenticado');
        });

        this.client.on('auth_failure', msg => {
            // Fired if session restore was unsuccessful
            console.error('Falha na Autenticação do WhatsApp', msg);
        });

        this.client.on('ready', () => {
            console.log('Cliente WhatsApp Pronto');
            const art = require('ascii-art')
            art.font("HERMES   API", 'doom', (err, rendered) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(rendered)
                    console.log('By MonteKali | Nícolas Pimenta')
                    console.log(`Cliente Rodando com o Número ${this.client.info.wid.user} \nNome da conta: ${this.client.info.pushname}`)
                }
            });

            this.clientUp = true
        });
        this.client.on('disconnected', () => {
            console.log('Cliente Desconectado')
            this.clientUp = false;
            this.client.initialize().then((_) => { console.log("Sucesso ao Restaurar Cliente") }).catch((_) => { console.log("Falha ao restaurar cliente") })
        })

    }
    getClient() {
        return this.clientUp
    }
}

module.exports = ClientWhatsapp;