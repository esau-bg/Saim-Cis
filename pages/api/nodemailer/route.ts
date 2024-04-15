import { type NextApiRequest, type NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default function handler (req: NextApiRequest, res: NextApiResponse) {
  const { email, nombrePersona, passwordTemp } = req.body
  const message = {
    from: `SAIM CIS ${process.env.NEXT_PUBLIC_EMAIL}`,
    to: email,
    subject: `Bienvenido a SAIM CIS ${nombrePersona}! 🎉`,
    text: `Hola ${nombrePersona}, tu contraseña temporal es ${passwordTemp}`
  }

  const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD
    }
  })

  if (req.method === 'POST') {
    transporter.sendMail(message, (err, info) => {
      if (err) {
        res.status(500).json({ error: err })
      } else {
        res.status(200).json({ data: info })
      }
    })
  }
}
