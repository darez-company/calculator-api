const { Router } = require('express')
const validator = require('express-joi-validation').createValidator({})

const metricsController = require('../controllers/metricsController')
const { getMetricsSchema } = require('../routesSchemas/entrySchemas')

const metricsRouter = Router()

metricsRouter.get('/:companyID', metricsController.getMetrics)

module.exports = metricsRouter
