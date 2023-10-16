const art = require('ascii-art')
art.font("HERMES   API", 'doom', (err, rendered) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log(rendered)
    }
});