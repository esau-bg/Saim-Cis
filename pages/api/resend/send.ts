import TemplateEmailPassTemp from '@/components/html-email'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, nombrePersona, passwordTemp } = req.body
  try {
    const { data, error } = await resend.emails.send({
      from: `SAIM CIS ${process.env.NEXT_PUBLIC_EMAIL}`,
      to: email,
      subject: `Bienvenido a SAIM CIS ${nombrePersona}! 🎉`,
      html: TemplateEmailPassTemp({
        nombre: nombrePersona,
        tempPass: passwordTemp
      })
    })

    if (error) {
      res.status(400).json({ error })
    }

    res.status(200).json({ data })
  } catch (error) {
    res.status(400).json({ error })
  }
}
