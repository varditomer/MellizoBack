const authService = require('./auth.service')

const login = async (req, res) => {
    const userCredentials = req.body
    try {
        console.log(`login in:`, userCredentials)
        const user = await authService.login(userCredentials)
        console.log("auth controller user:" ,user)
        res.json(user)
        // res.json({user})
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