const excel = require('excel4node')
const moment = require('moment')

const styles = {
    headerText: {
        font: {
            bold: true,
            size: 10,
        }
    }
}
module.exports = (entries, date) => new Promise(resolve => {
    const workbook = new excel.Workbook()
    const worksheet = workbook.addWorksheet('Meu dia');
    let total = 0;
    worksheet.cell(1,1).string('Data').style(styles.headerText);
    worksheet.cell(1,2).string('Hora').style(styles.headerText);
    worksheet.cell(1,3).string('Item').style(styles.headerText);
    worksheet.cell(1,4).string('Dinheiro').style(styles.headerText);
    worksheet.cell(1,5).string('Cartão').style(styles.headerText);
    worksheet.cell(1,6).string('Total').style(styles.headerText);
    entries.forEach((entry, index) => {
        entry.type === 'MONEY' ? worksheet.cell(index + 2, 4).string(`R$ ${entry.amount}`) : worksheet.cell(index + 2, 5).string(`R$ ${entry.amount}`)
        worksheet.cell(index + 2, 1).string(moment(entry.timestamp).format('DD/MM/YYYY'))
        worksheet.cell(index + 2, 2).string(moment(entry.timestamp).format('HH:mm'))
        worksheet.cell(index + 2, 3).string('Adicione uma descrição')
        total = total + entry.amount
    })
    worksheet.cell(2,6).string(`R$ ${total}`).style(styles.headerText);
    workbook.write(`Report-${date}.csv`, err => resolve(`Report-${date}.csv`))

})
