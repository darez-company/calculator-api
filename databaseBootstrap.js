const mongoose = require('mongoose')

const getDbURL = () => {
    return (process.env.DATABASE_HOST
        && process.env.DATABASE_NAME
        && process.env.DB_MONGODB_USER
        && process.env.DB_MONGODB_PASS
    )
        ? `mongodb://${process.env.DB_MONGODB_USER}:${process.env.DB_MONGODB_PASS}@${process.env.DATABASE_HOST}`
            + `:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`
        : 'mongodb://localhost:27017/calculator-database'
}

module.exports = async () => {
    try {
        await mongoose.connect(getDbURL(), {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
    } catch (err) {
        if (err.mesage) {
            console.error(`error on connecting to DB: ${err.message}`)
            throw new Error(err)
        }
        logger.error(`error on connecting to DB: ${err.message}`)
        throw new Error(err)
    }
}