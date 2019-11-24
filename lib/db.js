const { MongoClient } = require('mongodb')
const { config } = require('../config')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = encodeURIComponent(config.dbName)

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`

let connection

async function connectDB() {
    if (connection) return connection
    let client

    try {
        client = await MongoClient.connect(
          MONGO_URI,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }
        )
        connection = client.db(DB_NAME)
    } catch (error) {
        console.log('No se pudo conectar a la base de datos de mongo', MONGO_URI, error)
        process.exit(1)
    }
    return connection
}

module.exports = connectDB
