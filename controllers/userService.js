const asyncHandler = require('express-async-handler')
const factory = require('./handlerFactory')
const User = require('../models/userModel')


// @access private 
//@route GET /api/v1/users
exports.getUsers = factory.getAll(User)

// @access private 
//@route GET /api/v1/users/:id
exports.getUser = factory.getOne(User)

// @access private 
//@route POST /api/v1/users
exports.createUser = factory.createOne(User)

// @access private 
//@route PUT /api/v1/users/:id
exports.updateUser = factory.updateOne(User)

// @access private 
//@route DELETE /api/v1/users/:id
exports.deleteUser = factory.deleteOne(User)