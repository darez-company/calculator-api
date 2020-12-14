const http = require('./server')
const database = require('./databaseBootstrap')
const cron = require('node-cron')
const { sendMetricsEmail } = require('./controllers/metricsController')

async function startServer() {
 try {
    http.listen(8080, () => {
        console.info(`Server started on port: ${process.env.PORT || 8080}`)
    })
    await database()
 } catch (err) {
    console.log('Error')
    console.error(err)
    process.exit(0)
 }
}

cron.schedule('49 17 * * *', () => {
   sendMetricsEmail({ params: { companyID
   : '560'} }, { status: (param) => ({ end: (param) => null }) })
}, {
   scheduled: true,
   timezone: "America/Sao_Paulo"
 })

startServer()
