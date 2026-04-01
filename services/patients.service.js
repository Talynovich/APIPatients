import { Patients } from '../models/patientsModel.js'

export const getAllPatients = async () => {
  return await Patients.find()
}

export const getPatientById = async (id) => {
  return await Patients.findById(id)
}

export const createPatient = async (patient) => {
  const patients = new Patients(patient)
  return await patients.save()
}

export const updatePatient = async (id, updates) => {
  return await Patients.findByIdAndUpdate(
    id,
    {
      ...(updates.name !== undefined && { name: updates.name }),
      ...(updates.dob !== undefined && { dob: updates.dob }),
      ...(updates.gender !== undefined && { gender: updates.gender }),
      ...(updates.phone !== undefined && { phone: updates.phone }),
      ...(updates.diagnosis !== undefined && { diagnosis: updates.diagnosis }),
      ...(updates.medicalHistory !== undefined && {
        medicalHistory: updates.medicalHistory,
      }),
    },
    { returnDocument: 'after' }
  )
}

export const deletePatient = async (patientId, userId) => {
  const patient = await Patients.findOneAndDelete({
    _id: patientId,
    user: userId,
  })
  if (!patient) {
    throw new Error('Patient not found')
  }
  return patient
}
