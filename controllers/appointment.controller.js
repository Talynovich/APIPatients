import {
  createAppointment,
  getAppointmentsById,
} from '../services/appointment.service.js'

export const create = async (req, res) => {
  try {
    const appointmentData = {
      ...req.body,
      doctor: req.user.id
    };
    const appointment = await createAppointment(appointmentData)
    res.status(201).json(appointment)
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Ошибка при создании записи', error: error.message })
  }
}

export const getMyAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id
    const appointments = await getAppointmentsById(doctorId)
    console.log(appointments, 'appointments')

    res.json(appointments)
  } catch (error) {
    res.status(500).json({
      message: 'Ошибка при получении списка записей',
      error: error.message,
    })
  }
}
