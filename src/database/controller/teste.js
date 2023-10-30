const Teste = require('./controllercontatos')
const teste = new Teste()

teste.updateContato({
    id: 4,
    email: '24horasdodia@gmail.com.tv'

}).then((_) => { console.log(_) }).catch((_) => { console.log(_) })