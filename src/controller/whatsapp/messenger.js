const request = require('request');
const api = require('./url.js')
class sendMessage {

    enviaMensagem(numero, nome) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: api.url + `/messages`,
                headers: {
                    accept: 'application/json',
                    'D360-Api-Key': api.apikey,
                    'content-type': 'application/json'
                },
                body: {
                    "messaging_product": "whatsapp",
                    "recipient_type": "individual",
                    "to": numero,
                    "type": "template",
                    "template": {
                        "name": "pao_fresco",
                        "language": {
                            "code": "pt_BR"
                        },
                        "components": [
                            {
                                "type": "BODY",
                                "parameters": [
                                    {
                                        "type": "TEXT",
                                        "text": nome
                                    }
                                ]
                            }
                        ]
                    }
                },
                json: true
            };
            request(options, async (error, response, body) => {
                if (error) {
                    console.log(error)
                }
                else {
                    console.log(response.statusCode)
                    switch (response.statusCode) {
                        case 200:
                            console.log('Mensagem Enviada')
                            resolve('Mensagem Enviada')
                            break;
                        case 401:
                            console.log(response.body)
                            reject('erro')
                            break

                    }
                }
            }
            )
        })
    }
}
module.exports = sendMessage;
