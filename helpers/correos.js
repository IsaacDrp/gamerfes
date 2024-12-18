import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
const correoRegistro = async (info) => {
  const transport = nodemailer.createTransport({
    host: process.env.CORREO_HOST,
    port: process.env.CORREO_PORT,
    auth: {
      user: process.env.CORREO_USER,
      pass: process.env.CORREO_PASS,
    },
  });
  const { nombre, correo, token } = info;
  await transport.sendMail({
    from: "isaacdp09@gmail.com",
    to: correo,
    subject: "Confirma tu registro de FES Aragon",
    html: `
<p> Como estas ${nombre}, para terminar por favor comprueba la cuenta</p>
<p> Confirma en el siguiente enlace:
<a href="${process.env.URL_BACKEND}:${process.env.PORT_BACKEND ?? 2800}
/credenciales/confirmar/${token}"> Confirmar </a>
</p>
<p>Si no solicitaste el registro, por favor ignora el mensaje</p>
`,
  });
};
export { correoRegistro };
