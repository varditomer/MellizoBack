const authService = require('./auth.service')

const login = async (req, res) => {
    const userCredentials = req.body
    console.log(userCredentials, "auth c")
    try {
        console.log(`login in:`, userCredentials)
        const user = await authService.login(userCredentials)
        res.json({user})
    } catch (err) {
        console.error(`err:`, err)
        res.status(401).send({ err: 'Failed to login' })
    }
}

const signup = async (req, res) => {
    const userDetails = req.body
    const userCredentials = { email: userDetails.email, password: userDetails.password }

    try {
        await authService.signup(userDetails)
        console.log(`llllll:`,)
        const user = await authService.login(userCredentials)
        res.json(user)
    } catch (err) {
        console.error(`err:`, err)
        res.status(401).send({ err: 'Failed to login' })
    }
}

module.exports = {
    login,
    signup
}