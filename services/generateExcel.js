const excel = require('excel4node')
const moment = require('moment')

const styles = {
    headerText: {
        font: {
            bold: true,
            size: 10,
        },
        alignment: {
            wrapText: true,
            horizontal: 'center',
            shrinkToFit: true,
        },
    },
    descriptionText: {
        font: {
            size: 10,
            color: '#808080'
        },
    }
}
module.exports = (entries, date) => new Promise(resolve => {
    const workbook = new excel.Workbook()
    const worksheet = workbook.addWorksheet('Meu dia');
    let total = 0;
    worksheet.cell(1,1, 1, 2).string('Data').style(styles.headerText);
    worksheet.cell(1,2).string('Hora').style(styles.headerText);
    worksheet.cell(1,3, 1,4, true).string('Item').style(styles.headerText);
    worksheet.cell(1,5).string('Dinheiro').style(styles.headerText);
    worksheet.cell(1,6).string('Cartão').style(styles.headerText);
    worksheet.cell(1,7).string('Total').style(styles.headerText);
    entries.forEach((entry, index) => {
        entry.type === 'MONEY' ? worksheet.cell(index + 2, 5).string(`R$ ${entry.amount.toLocaleString("pt", {useGrouping: false, minimumFractionDigits: 2})}`) : worksheet.cell(index + 2, 6).string(`R$ ${entry.amount.toLocaleString("pt", {useGrouping: false, minimumFractionDigits: 2})}`)
        worksheet.cell(index + 2, 1).string(moment(entry.timestamp).format('DD/MM/YYYY'))
        worksheet.cell(index + 2, 2).string(moment(entry.timestamp).tz('America/Sao_Paulo').format('HH:mm'))
        worksheet.cell(index + 2, 3).string('Adicione uma descrição').style(styles.descriptionText)
        total = total + entry.amount
    })
    worksheet.cell(2,7).string(`R$ ${total}`).style(styles.headerText);
    workbook.write(`Report-${date}.xlsx`, err => resolve(`Report-${date}.xlsx`))

})
