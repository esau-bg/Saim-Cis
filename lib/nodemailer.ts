// ./src/lib/nodemailer.js
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD
  }
})

export default transporter
