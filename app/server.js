const app = require('./index')
const config = require('./config')

app.listen(config.express.port, config.express.ip, function (error) {
    if (error) {
        console.log('Unable to listen for connections', error)
        process.exit(10)
    }
    console.log('express is listening on http://' +
        config.express.ip + ':' + config.express.port)
})
