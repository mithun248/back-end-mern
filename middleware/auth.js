const jwt = require('jsonwebtoken')
const UserModel = require('../user')

const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await UserModel.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      res.status(401).json({ message: 'Not authorized to access this route' })
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized to access this route' })
  }
}

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `User role ${req.user.role} is not authorized to access this route`
      })
    }
    next()
  }
}

module.exports = { protect, authorize } 