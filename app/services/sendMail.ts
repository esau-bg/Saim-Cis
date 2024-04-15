// ./src/services/sendMail.js
import transporter from '@/lib/nodemailer'

export default async function sendEmail ({ subject, html, to }: { subject: string, html: string, to: string }) {
  const mailOptions = {
    from: `SAIM CIS ${process.env.NEXT_PUBLIC_EMAIL}`,
    to, // The person you want your email to be sent
    subject,
    html
    // You can also add in HTML if you dont want plain text
  }

  return await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err)
        reject(new Error('Unable to send email'))
        return
      }

      const message = `Message delivered to ${info.accepted.join(', ')}`
      resolve(message)
    })
  })
}
