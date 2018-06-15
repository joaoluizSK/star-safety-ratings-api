const config = module.exports

config.express = {
    port: process.env.EXPRESS_PORT || 8888,
    ip: '127.0.0.1'
}