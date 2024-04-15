// ./src/app/api/send-email/route.ts

import sendMail from '@/app/services/sendMail'
import TemplateEmailPassTemp from '@/components/html-email'
import { type NextRequest, NextResponse } from 'next/server'

/**
 * @param {NextRequest} request
 * @returns {Promise<NextResponse>}
 */
export async function POST (request: NextRequest): Promise<NextResponse> {
  const {
    email,
    passwordTemp,
    nombrePersona
  } = await request.json()

  try {
    const response = await sendMail({
      to: email,
      subject: `Bienvenido a SAIM CIS ${nombrePersona}! 🎉`,
      html: TemplateEmailPassTemp({
        nombre: nombrePersona,
        tempPass: passwordTemp
      })
    })

    if (response instanceof Error) {
      throw response
    }

    return NextResponse.json({ message: 'Correo enviado con exito' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 503 })
  }
}
