import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: [true, 'Email already exists'],
  },
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    match: [
      /^[a-zA-Z0-9]{8,20}$/,
      'Username must be between 8 and 20 characters and must be unique',
    ],
    unique: true,
  },
  image: {
    type: String,
  },
})

const User = models.User || model('User', UserSchema)
export default User
