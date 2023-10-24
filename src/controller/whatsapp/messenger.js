const request = require('request');
const api = require('./url.js')
class sendMessage {
    enviaMensagem(numero, nome) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: api.url + `/v1/messages`,
                headers: {
                    accept: 'application/json',
                    'D360-Api-Key': api.apikey,
                    'content-type': 'application/json'
                },
                body: {
                    "to": numero,
                    "type": "template",
                    "template": {
                        "namespace": "4454ace0_cb05_47dd_b0d7_bac70f735f93",
                        "language": {
                            "policy": "deterministic",
                            "code": "pt_BR"
                        },
                        "name": "pao_fresco",
                        "components": [{
                            "type": "body",
                            "parameters": [{
                                "type": "text",
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
                        case 201:
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
