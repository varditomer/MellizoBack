const Cryptr = require('cryptr')
const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const cryptr = new Cryptr(process.env.SECRET || 'Secret-Puk-1234')

const login = async (userCredentials) => {
    console.log(`userCredentials:`, userCredentials)
    const { email, password } = userCredentials

    const user = await userService.getByEmail(email)
    console.log(`user:`, user)
    if (!user) return Promise.reject('Invalid email or password')

    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid email or password')

    delete user.password
    user._id = user._id.toString()
    
    console.log(user)
    return user;

    // return user
}

const signup = async (userDetails) => {
    console.log(`userDetails:`, userDetails)
    const saltRounds = 10;
    const { email, password, phoneNumber, firstName, lastName } = userDetails
    if (!email || !password || !firstName || !lastName || !phoneNumber) return Promise.reject("Missing required user's signup details")

    const existingUser = await userService.getByEmail(email)
    if (existingUser) return Promise.reject('email already exist')

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