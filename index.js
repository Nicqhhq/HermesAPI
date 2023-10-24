const express = require('./src/api/express/express.js')
const art = require('ascii-art')

const teste = new express
art.font("HERMES   API", 'doom', (err, rendered) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log(rendered)
        console.log('By MonteKali | Nícolas Pimenta')
    }
});
teste.start()