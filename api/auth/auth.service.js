const Cryptr = require('cryptr')
const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const cryptr = new Cryptr(process.env.SECRET || 'Secret-Puk-1234')

const login = async (userCredentials) => {
    console.log(`userCredentials:`, userCredentials)
    const { username, password } = userCredentials

    const user = await userService.getByUsername(username)
    console.log(`user:`, user)
    if (!user) return Promise.reject('Invalid username or password')

    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')

    delete user.password
    user._id = user._id.toString()
    return user
}

const signup = async (userDetails) => {
    console.log(`userDetails:`, userDetails)
    const saltRounds = 10;
    const { username, password, firstName, lastName } = userDetails
    if (!username || !password || !firstName || !lastName) return Promise.reject("Missing required user's signup details")

    const existingUser = await userService.getByUsername(username)
    if (existingUser) return Promise.reject('Username already exist')

    const hash = await bcrypt.hash(password, saltRounds)

    return userService.add(
        {
            ...userDetails,
            password: hash,
        }
    )
}

module.exports = {
    login,
    signup
}