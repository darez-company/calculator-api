const Joi = require('joi')

const getMetricsSchema = Joi.object({
    companyID: Joi.string().required(),
})

module.exports = {
    getMetricsSchema
}