const { Router } = require('express')
const validator = require('express-joi-validation').createValidator({})

const entryController = require('../controllers/entryController')
const { createEntrySchema } = require('../routesSchemas/entrySchemas')

const entryRouter = Router()

entryRouter.post('/', validator.body(createEntrySchema) ,entryController.createEntry)

module.exports = entryRouter
