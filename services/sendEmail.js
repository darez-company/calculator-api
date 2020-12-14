const nodeMailer = require('nodemailer')

const myEmail = 'doladoreport@outlook.com'

const transport = nodeMailer.createTransport({
    service: 'outlook',
    auth: {
        user: myEmail,
        pass: 'D0lado@2020'
    }
})

module.exports = ({ excelName, companyID }) => {
    const message = {
        from: myEmail,
        to: ['simoes@compredolado.com.br', 'gabriel@compredolado.com.br', 'fred@compredolado.com.br', 'khalil@compredolado.com.br'],
        subject: `Report empresa - ${companyID}`,
        text: 'Report dos valores',
        attachments: [{
            path: excelName
        }]
    }
    
    transport.sendMail(message, (err) => {
        if(err) console.log(err)
    })
}

