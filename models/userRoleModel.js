import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const userRoleSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    role: {
      type: String,
      enum: ['Admin', 'Doctor'],
      default: 'Doctor',
    },
    specialization: { type: String },
  },
  { timestamps: true }
)

userRoleSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
  }
})

export const userRole = mongoose.model('userRole', userRoleSchema)
