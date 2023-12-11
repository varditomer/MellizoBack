const express = require('express');
const {
    getUsers,
    getUser,
    updateUser
} = require('./user.controller')
const router = express.Router()

// Routes
router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/:id', updateUser)

module.exports = router