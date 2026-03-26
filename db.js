import mongoose from 'mongoose'

const uri =
  'mongodb+srv://api-user:LXV3xyCZ@cluster0.h4rfuqj.mongodb.net/patients?retryWrites=true&w=majority'

export const connectDB = async () => {
  try {
    await mongoose.connect(uri)
    console.log('бд подключена')
  } catch (err) {
    console.error('Ошибка подключения к бд', err)
    process.exit(1)
  }
}
