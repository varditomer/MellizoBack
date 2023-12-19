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

const getByEmail = async (email) => {
    try {
        const collection = await dbService.getCollection(USER_COLLECTION)
        const user = await collection.findOne({
            email
        })
        console.log("get by email:", user)
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
        const userId = new ObjectId(user._id);
        const userToUpdate = { ...user };
        delete userToUpdate._id; // Remove the _id as it's not updated

        const collection = await dbService.getCollection(USER_COLLECTION);
        await collection.updateOne({ _id: userId }, { $set: userToUpdate });
        console.log("backend finished updating")
        return userToUpdate; // Return the updated user data
    } catch (err) {
        console.error(`Error in updating user:`, err);
        throw err; // Rethrow the error to be handled by the caller
    }
}

module.exports = {
    query,
    getById,
    getByEmail,
    add,
    update
}