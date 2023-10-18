import prisma from "@/lib/prismadb";
import nodemailer, { SentMessageInfo } from "nodemailer";
type MailSendResult = { success?: any; error?: string } & (
  | { success: SentMessageInfo; message: string }
  | { error: string }
);

export const resetPassword = async (
  email: string,
  token: string
): Promise<MailSendResult> => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: email,
      },
      select: {
        email: true,
        name: true,
        password: true,
      },
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });
    // URL for production app
    // const resetLink = `https://liviapoma.vercel.app/resetpassword/${token}`;

    // URL for both
    const url_base =
      process.env.NODE_ENV !== "production"
        ? "http://localhost:3000/"
        : "https://liviapoma.vercel.app/";
    const resetLink = `${url_base}resetpassword/${token}`;

    const mailOptions = {
      from: "Liviapoma",
      to: user.email as string,
      subject: "Restablecer contraseña",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <body>
            <div>
                <div>
                    <h1>Información de la contraseña de tu cuenta en Liviapoma</h1>
                    <p>Estimado/a ${user?.name},</p>
                    <p>Hemos recibido una solicitud para restablecer tu contraseña en Liviapoma.</p>
                    <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
                    <p><a href="${resetLink}" target="_blank">Restablecer contraseña</a></p>
                    <p>Si no solicitaste el restablecimiento de contraseña, puedes ignorar este mensaje.</p>
                    <p>Gracias por usar Liviapoma.</p>
                    <p>Saludos cordiales,</p>
                    <p><b>Equipo de soporte - Liviapoma</b></p>
                </div>
            </div>
        </body>
        </html>
      `,
    };
    const info = await transporter.sendMail(mailOptions);
    return { success: info, message: "Email enviado" };
  } catch (error) {
    const specificError = error as { message: string };
    console.error(specificError.message);
    return { error: specificError.message };
  }
};
