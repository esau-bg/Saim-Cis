'use server'
import { Resend } from 'resend'

export async function sendMailSingup ({
  email,
  passwordTemp,
  nombrePersona
}: {
  email: string
  passwordTemp: string
  nombrePersona: string
}) {
  const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY)

  const { data, error } = await resend.emails.send({
    from: 'SAIM CIS <saim.cis@outlook.com>',
    to: ['jebagid228@etopys.com'],
    subject: 'Bienvenido a SAIM CIS Porfavorfunciona! 🎉',
    html: 'Hola'
  })

  return { data, error }
}
