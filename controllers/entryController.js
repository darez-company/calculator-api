const moment = require('moment')

const calculatorEntries = require('../models/calculatorEntries')

const createEntry = async ({ body }, res) => {
    const { userID, userCompanyID, amount, type } = body
    const date = moment().format('DD-MM-YYYY')
    const userHasEntries = await calculatorEntries.findOne({ userID, userCompanyID, date }).exec()
    if (userHasEntries) {
        await calculatorEntries.findOneAndUpdate({ userID, userCompanyID, date }, {
            $push: { entries: { type, amount } }
        })
        return res.status(204).end()
    }
    await calculatorEntries({ userID, userCompanyID, date, entries: [{ type, amount }] }).save()
    return res.status(201).end()
}

module.exports = { createEntry }