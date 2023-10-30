const path = require('path')
const express = require('express');
const router = express.Router();
const WhatsappWebJS = require(path.join(__dirname, '..', 'api.js'));
const whatsappWebJS = new WhatsappWebJS;
const WhatsappDialog = require(path.join(__dirname, '..', '..', '360api', 'controllerapi', 'controllerdialog.js'))
const whatsappDialog = new WhatsappDialog();

router.post('/v1/hermesapi/webjs/enviamensagem/', (req, res) => {
    whatsappWebJS.enviaMensagem(req, res)
})
router.post('/v1/hermesapi/oficial/enviamensagem/template', (req, res) => {
    whatsappDialog.routeSendTemplate(req, res)
})


module.exports = router