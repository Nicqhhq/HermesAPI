const axios = require('axios').default;

const instance = axios.create({
    timeout: 5000,
    baseURL: 'https://waba-v2.360dialog.io',
    headers: {
        'D360-Api-Key': 'xEx580iPxtJIUFGRFMNpYPSEAK',
        'Content-Type': "application/json",
    }
})

module.exports = instance 