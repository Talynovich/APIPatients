import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // чтобы значение для данного поля было уникальным
    },
    password: {
      type: String,
      required: true,
      minLength: 8, // минимальное количество символов
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
  }
})

export const User = mongoose.model('users', userSchema)
