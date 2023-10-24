const path = require('path')
const express = require('express');
const router = express.Router();
const Api = require(path.join(__dirname, '..', 'api.js'));
const api = new Api();

router.post('/v1/hermesapi/enviamensagem', (req, res) => {
    api.enviaMensagem(req, res)
})



module.exports = router