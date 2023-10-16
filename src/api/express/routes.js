const path = require('path')
const express = require('express');
const router = express.Router();
const Api = require(path.join(__dirname, '..', 'api.js'));
const api = new Api();

router.post('/v1/hermesapi/enviamenssager', (req, res) => {
    api.enviaMensagem(req, res)
})

// router.post('/v1/pipersound/setvolume', (req, res) => {
//     api.setVolAudio(req, res)
// })

// router.post('/v1/pipersound/setAppvolume', (req, res) => {
//     api.setAppVolAudio(req, res)
// })


module.exports = router