import * as patientsService from '../services/patients.service.js'

export const getAllPatients = async (req, res) => {
  const patients = await patientsService.getAllPatients()
  res.json(patients)
}

export const getPatientById = async (req, res) => {
  const id = req.params.patientsId
  const patient = await patientsService.getPatientById(id)

  if (!patient) {
    return res.status(404).json({ message: `No patient with id ${id}` })
  }
  res.json(patient)
}

export const createPatient = async (req, res) => {
  const patient = req.body
  if (!patient) {
    return res.status(400).json({ message: 'patient is required' })
  }

  const newPatient = await patientsService.createPatient(patient)
  res.status(201).json(newPatient)
}

export const updatePatient = async (req, res) => {
  const id = req.params.patientsId
  const updatedPatient = await patientsService.updatePatient(id, req.body)

  if (!updatedPatient) {
    return res.status(404).json({ message: `No patient with id ${id}` })
  }

  res.json(updatedPatient)
}

export const deletePatient = async (req, res) => {
  const id = req.params.patientsId
  const deletedPatient = await patientsService.deletePatient(id)

  if (!deletedPatient) {
    return res.status(404).json({ message: `No patient with id ${id}` })
  }

  res.json(deletedPatient)
}
