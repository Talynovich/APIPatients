import { Appointment } from '../models/appointmentModel.js'

export const createAppointment = async (appointmentData) => {
  return await Appointment.create(appointmentData)
}

export const getAppointmentsById = async (doctorId) => {
  return await Appointment.find({ doctor: doctorId })
}
