const { Schema, model } = require('mongoose')

const entrySchema = new Schema({
    type: { type: String, enum: ['CARD', 'MONEY'] ,required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now() }
})

const calculatorEntriesSchema = new Schema({
    userID: { type: String, required: true },
    userCompanyID: { type: String, required: true },
    date: { type: String, required: true },
    entries: { type: [entrySchema] }
})

module.exports = model('entry', calculatorEntriesSchema, 'entry')