const jwt = require('jsonwebtoken')
const UserModel = require('../user')

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, location } = req.body

    // Check if user exists
    const userExists = await UserModel.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Create user
    const user = await UserModel.create({
      name,
      email,
      password,
      phone,
      location
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        role: user.role,
        token: generateToken(user._id)
      })
    }
  } catch (error) {
    console.error('Registration error:', error)
    res.status(400).json({ message: error.message })
  }
}

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check for user email
    const user = await UserModel.findOne({ email }).select('+password')

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        role: user.role,
        token: generateToken(user._id)
      })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    console.error('Login error:', error)
    res.status(400).json({ message: error.message })
  }
}

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id)
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        role: user.role
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
} 