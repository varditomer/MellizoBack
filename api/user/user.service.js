const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

const USER_COLLECTION = 'user'

const query = async () => {
    try {
        const collection = await dbService.getCollection(USER_COLLECTION);
        let users = await collection.find().toArray()
        users = users.map(user => {
            delete user.password
            return user
        })
        return users
    } catch (err) {
        console.error(`err:`, err)
    }
}

const getById = async (userId) => {
    try {
        const collection = await dbService.getCollection(USER_COLLECTION)
        const user = await collection.findOne({
            _id: ObjectId(userId)
        })
        delete user.password
        return user
    } catch (err) {
        console.error(`err:`, err)
    }
}

const getByUsername = async (username) => {
    try {
        const collection = await dbService.getCollection(USER_COLLECTION)
        const user = await collection.findOne({
            username
        })
        return user
    } catch (err) {
        console.error(`err:`, err)
    }
}

const add = async (user) => {
    console.log(`user:`, user)
    try {
        const collection = await dbService.getCollection(USER_COLLECTION);
        collection.insertOne(user)
    } catch (err) {
        console.error(`err:`, err)
    }
}

const update = async (user) => {
    try {
        const userToUpdate = {
            _id: ObjectId(user._id)
        }

        const collection = dbService.getCollection(USER_COLLECTION);
        await collection.updateOne(
            { _id: userToUpdate._id },
            { $set: userToUpdate }
        )
        return userToUpdate;
    } catch (err) {
        console.error(`err:`, err)
    }
}

module.exports = {
    query,
    getById,
    getByUsername,
    add,
    update
}