import mongoose from 'mongoose'

const patientsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    diagnosis: {
      type: String,
      required: true,
    },
      medicalHistory: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Patients = mongoose.model('Patients', patientsSchema)
