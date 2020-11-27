const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')

const entryRouter = require('./routers/entry')

const app = express()

app.use(bodyParser.json())
app.use(helmet())
app.use(compression())
app.use(cors())

app.use('/entry', entryRouter)
app.use('/', (req, res) => res.status(200).end())
module.exports = app