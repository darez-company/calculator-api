const { Router } = require('express')

const metricsController = require('../controllers/metricsController')

const metricsRouter = Router()

metricsRouter.get('/:companyID', metricsController.getMetrics)
metricsRouter.post('/mail/:companyID', metricsController.sendMetricsEmail)

module.exports = metricsRouter
