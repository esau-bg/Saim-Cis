'use server'
import TemplateEmailPassTemp from '@/components/html-email'
import { transporter } from '@/lib/email'

export async function sendMailSingup ({
  email,
  passwordTemp,
  persona
}: {
  email: string
  passwordTemp: string
  persona: Personas
}) {
  const mailOptions = {
    from: `SAIM CIS ${process.env.NEXT_PUBLIC_EMAIL}`,
    to: email,
    subject: `Bienvenido a SAIM CIS ${persona.nombre}! 🎉`,
    text: `Su contraseña temporal es: ${passwordTemp}`,
    html: TemplateEmailPassTemp({
      nombre: persona.nombre,
      tempPass: passwordTemp
    })
  }

  const emailResponse = await transporter.sendMail(mailOptions)

  return emailResponse
}
