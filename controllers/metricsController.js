const moment = require('moment')
const fs = require('fs')

const generateExcel = require('../services/generateExcel')
const calculatorEntries = require('../models/calculatorEntries')

const sleep = require('util').promisify(setTimeout)

const getMetrics = async ({ params: { companyID }, query: { queryDate } }, res) => {
    try {
        const date = moment().format('DD-MM-YYYY')
        const entries = await calculatorEntries.findOne({ userCompanyID: companyID, date: queryDate || date }).exec()
        if (!entries || !entries.entries) return res.status(204).end()
        const excelName = await generateExcel(entries.entries, queryDate || date)
        res.header('Content-Type', 'text/csv');
        res.download(`${__dirname}/../${excelName}`)
        await sleep(1000)
        fs.unlink(`${__dirname}/../${excelName}`, err => {
            if (err) console.error(err)
        })
    } catch (err) {
        console.error(err)
        res.status(500)
    }
}

module.exports = {
    getMetrics
}