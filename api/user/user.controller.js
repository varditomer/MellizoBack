
const userService = require('./user.service')

const getUsers = async (req, res) => {
    try {
        const users = await userService.query()
        res.send(users)
    } catch (err) {
        console.error(`err:`, err)
        res.status(500).send({ err: 'Failed to get users' })
    }
}

const getUser = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await userService.getById(userId)
        res.send(user)
    } catch (err) {
        console.error(`err:`, err)
        res.status(500).send({ err: 'Failed to get user' })
    }
}

const updateUser = async (req, res) => {
    console.log("Entered UpdateUser inside user controller")
    try {
        const user = req.body
        const updatedUser = await userService.update(user)
    } catch (err) {
        
    }
}

module.exports = {
    getUsers,
    getUser,
    updateUser
}