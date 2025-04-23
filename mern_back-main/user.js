const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Define schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  phone: {
    type: Number,
    required: [true, 'Please provide a phone number']
  },
  location: {
    type: String,
    required: [true, 'Please provide a location']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Create model object
const UserModel = mongoose.model("Users", UserSchema)

// Drop existing indexes to fix the duplicate key error
const dropIndexes = async () => {
  try {
    await UserModel.collection.dropIndexes()
    console.log('✅ User indexes dropped successfully')
  } catch (error) {
    console.log('❌ Error dropping indexes:', error.message)
  }
}

// Call the function to drop indexes
dropIndexes()

module.exports = UserModel