/**
 * Endpoint principal
 * Recibe POST desde el formulario de registro
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("No se recibieron datos POST");
    }

    const data = JSON.parse(e.postData.contents);
    const email = data.email;

    if (!email || !isValidEmail(email)) {
      throw new Error("Correo inválido");
    }

    enviarCorreoVerificacion(email);

    return jsonResponse({
      success: true,
      message: "Correo enviado correctamente"
    });

  } catch (error) {
    Logger.log(error);
    return jsonResponse({
      success: false,
      message: "Error en el servidor",
      error: error.message
    });
  }
}


/**
 * Validación simple de correo
 */
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Envío del correo
 */
function enviarCorreoVerificacion(email) {
  const urlDestino = "https://yococreo.org/completar-proceso";

  const asunto = "Completa tu registro en YoCoCreo";

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
      <h2 style="color:#222;">¡Estás a un paso de completar tu registro!</h2>
      <p>
        Gracias por iniciar tu registro en <strong>YoCoCreo</strong>.
      </p>
      <p>
        Da clic en el siguiente botón para continuar con el proceso:
      </p>

      <div style="text-align:center; margin:30px 0;">
        <a href="${urlDestino}"
           style="
             background:#f57c00;
             color:#ffffff;
             padding:14px 24px;
             text-decoration:none;
             border-radius:6px;
             font-size:16px;
             display:inline-block;
           ">
          Completar registro
        </a>
      </div>

      <p style="font-size:12px; color:#666;">
        Si no solicitaste este registro, puedes ignorar este mensaje.
      </p>
    </div>
  `;

  GmailApp.sendEmail(email, asunto, "Tu cliente de correo no soporta HTML", {
    htmlBody: htmlBody,
    name: "YoCoCreo"
  });
}

/**
 * Respuesta JSON estándar
 */
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
