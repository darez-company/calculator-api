const http = require('./server')
const database = require('./databaseBootstrap')
const moment = require('moment')

async function startServer() {
 try {
    http.listen(8080, () => {
        console.info(`Server started on port: ${process.env.PORT || 8080}`)
    })
    await database()
 } catch (err) {
     console.error(err)
     process.exit(0)
 }
}

startServer()
// moment().format('DD-MM-YYYY')