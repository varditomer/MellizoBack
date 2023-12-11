const MongoClient = require('mongodb').MongoClient

const config = require('../config')
let dbConn = null

const getCollection = async (collectionName) => {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        console.error(`err:`, err)
    }
}

const connect = async () => {
    if (dbConn) return dbConn

    try {
        const client = await MongoClient.connect(config.dbURL)
        const db = client.db(config.dbName)
        dbConn = db
        return db
    } catch (err) {
        console.error(`err:`, err)
    }
}

module.exports = {
    getCollection
}

