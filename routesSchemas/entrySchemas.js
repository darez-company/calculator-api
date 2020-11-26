const Joi = require('joi')

const createEntrySchema = Joi.object({
    userID: Joi.string().required(),
    userCompanyID: Joi.string().required(),
    amount: Joi.number().required(),
    type: Joi.string().required().valid('MONEY', 'CARD')
})

module.exports = {
    createEntrySchema
}