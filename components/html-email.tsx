export default function TemplateEmailPassTemp ({ nombre, tempPass }: { nombre: string, tempPass: string }) {
  return (
    `
    <!DOCTYPE html>
    <html
      xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
    >
      <head>
        <!--[if gte mso 15]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG />
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        <![endif]-->
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>🎉 ¡Bienvenido a SAIM CIS ${nombre}! 🎉</title>
        <!-- <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&amp;display=swap"
          rel="stylesheet"
          type="text/css"
        />
        <style type="text/css">
          @import url(https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&amp;display=swap);
        </style> -->
        <!--<![endif]-->
      </head>
      <body>
        <style>
          * {
            margin: 0px;
            padding: 0px;
            box-sizing: border-box;
          }
        </style>
        <div
          style="
            width: 100%;
            padding: 2rem;
            background-color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          "
        >
          <div
            style="
              width: 100%;
              flex-grow: 1;
              padding: 2rem;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: center;
              gap: 1.5rem;
              max-width: 800px;
            "
          >
            <div
              style="
                width: 50px;
                height: 50px;
                background-color: #3b82f6;
                border-radius: 1.5rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 0.625rem;
              "
            >
              <span
                style="
                  color: white;
                  font-size: 1.25rem;
                  font-weight: 500;
                  font-family: 'Inter', Roboto, 'Open Sans', sans-serif;
                "
              >
                SC
              </span>
            </div>
            <h1
              style="
                flex-grow: 1;
                text-align: center;
                color: black;
                font-size: 2rem;
                font-weight: 400;
                font-family: 'Inter', Roboto, 'Open Sans', sans-serif;
                line-height: 1.75;
              "
            >
              🎉 ¡Bienvenido a SAIM CIS
              <span
                style="
                  flex-grow: 1;
                  text-align: center;
                  color: black;
                  font-size: 2rem;
                  font-weight: 500;
                  font-family: 'Inter', Roboto, 'Open Sans', sans-serif;
                  line-height: 1.75;
                "
                >${nombre}</span
              >! 🎉
            </h1>
          </div>
          <div
            style="
              width: 100%;
              flex-grow: 1;
              padding: 2%;
              background-color: white;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: center;
              gap: 1rem;
              max-width: 800px;
            "
          >
            <p
              style="
                flex-grow: 1;
                text-align: center;
                color: #475569;
                font-size: 1rem;
                font-weight: 400;
                font-family: 'Inter', Roboto, 'Open Sans', sans-serif;
                line-height: 1.75;
              "
            >
              Su cuenta de SAIM CIS esta casi completa
            </p>
            <div
              style="
                flex-grow: 1;
                padding: 0.625rem;
                border-radius: 0.625rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 0.3125rem;
                width: 100%;
              "
            >
              <div
                style="
                  padding: 0rem 1rem 0rem 1rem;
                  border-radius: 0.625rem;
                  border: 1px dashed #6366f1;
                  justify-content: center;
                  align-items: center;
                  display: inline-flex;
                "
              >
                <h2
                  style="
                    text-align: center;
                    color: #6366f1;
                    font-size: 2.25rem;
                    font-weight: 700;
                    font-family: 'Inter', Roboto, 'Open Sans', sans-serif;
                    line-height: 1.75;
                  "
                >
                  ${tempPass}
                </h2>
              </div>
              <span
                style="
                  flex-grow: 1;
                  text-align: center;
                  color: #475569;
                  font-size: 0.875rem;
                  font-weight: 400;
                  font-family: 'Inter', Roboto, 'Open Sans', sans-serif;
                "
              >
                Contraseña Temporal
              </span>
            </div>
            <div style="flex-grow: 1; text-align: center">
              <span
                style="
                  color: #475569;
                  font-size: 1rem;
                  font-weight: 400;
                  font-family: 'Inter', Roboto, 'Open Sans', sans-serif;
                  line-height: 1.75;
                "
                >Puede acceder a </span
              ><a
                style="
                  color: #3b82f6;
                  font-size: 0.875rem;
                  font-weight: 500;
                  font-family: 'Inter', Roboto, 'Open Sans', sans-serif;
                  line-height: 1.75;
                "
                href="https://saimcis.vercel.app/login"
                >https://saimcis.vercel.app/login</a
              ><span
                style="
                  color: #475569;
                  font-size: 1rem;
                  font-weight: 400;
                  font-family: 'Inter', Roboto, 'Open Sans', sans-serif;
                  line-height: 1.75;
                "
              >
                para iniciar sesión.</span
              >
            </div>
            <div
              style="
                width: 125px;
                height: 0px;
                border: 1px solid rgb(123, 123, 123);
              "
            ></div>
            <p
              style="
                flex-grow: 1;
                text-align: center;
                color: #64748b;
                font-size: 1rem;
                font-weight: 400;
                font-family: 'Inter', Roboto, 'Open Sans', sans-serif;
                line-height: 1.75;
              "
            >
              Si tiene alguna pregunta, no dude en responder a este correo
              electrónico o ponerse en contacto con nosotros en
              <a
                style="
                  color: #3b82f6;
                  font-size: 1rem;
                  font-weight: 400;
                  font-family: 'Inter', Roboto, 'Open Sans', sans-serif;
                  line-height: 1.75;
                "
                href="mailto:saim.cis@outlook.com"
              >
            </p>
          </div>
          <div
            style="
              width: 100%;
              flex-grow: 1;
              height: 10rem;
              padding: 2rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 1rem;
              max-width: 800px;
            "
          >
            <div
              style="
                flex-grow: 1;
                text-align: center;
                color: #64748b;
                font-size: 1.5rem;
                font-weight: 600;
                font-family: 'Inter', Roboto, 'Open Sans', sans-serif;
                line-height: 1.75;
              "
            >
              SAIM CIS
            </div>
            <div
              style="
                flex-grow: 1;
                text-align: center;
                color: #64748b;
                font-size: 0.75rem;
                font-weight: 400;
                font-family: 'Inter', Roboto, 'Open Sans', sans-serif;
                line-height: 1;
              "
            >
              Copyright © 2024<br />SAIM CIS Todos los derechos reservados.<br />
              <a
                style="
                  color: #3b82f6;
                  font-size: 0.75rem;
                  font-weight: 400;
                  font-family: 'Inter', Roboto, 'Open Sans', sans-serif;
                  line-height: 1;
                "
                href="#"
                >Privacidad</a
              >
              <span
                style="
                  color: #64748b;
                  font-size: 0.75rem;
                  font-weight: 400;
                  font-family: 'Inter', Roboto, 'Open Sans', sans-serif;
                  line-height: 1;
                "
                >|</span
              ><a
                style="
                  color: #3b82f6;
                  font-size: 0.75rem;
                  font-weight: 400;
                  font-family: 'Inter', Roboto, 'Open Sans', sans-serif;
                  line-height: 1;
                "
                href="#"
                >Términos</a
              >
            </div>
          </div>
        </div>
      </body>
    </html>
    
  `
  )
}
