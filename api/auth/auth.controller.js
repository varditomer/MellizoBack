const authService = require('./auth.service')

const login = async (req, res) => {
    const userCredentials = req.body
    try {
        const user = await authService.login(userCredentials)
        res.json(user)
    } catch (err) {
        console.error(`err:`, err)
        res.status(401).send({ err: 'Failed to login' })
    }
}

const signup = async (req, res) => {
    const userDetails = req.body
    // const userCredentials = { email: userDetails.email, password: userDetails.password }
    try {
        await authService.signup(userDetails)
        // const user = await authService.login(userCredentials)
        res.status(200).send({ message: 'Signup successful' });
    } catch (err) {
        console.error(`err:`, err)
        res.status(401).send({ err: 'Failed to sign up' })
    }
}

module.exports = {
    login,
    signup
}