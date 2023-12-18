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
    console.log("entered update function in user service")
    try {
        // Convert the string ID to an ObjectId
        const userId = new ObjectId(user._id);

        // Clone the user object and remove the _id field
        const userToUpdate = { ...user };
        delete userToUpdate._id; // Removing _id as it's not updated

        const collection = await dbService.getCollection(USER_COLLECTION);
        await collection.updateOne(
            { _id: userId },
            { $set: userToUpdate } // Update the fields in userToUpdate
        );

        return userToUpdate; // Optionally, return the updated user data
    } catch (err) {
        console.error(`err:`, err);
    }
}

module.exports = {
    query,
    getById,
    getByEmail,
    add,
    update
}