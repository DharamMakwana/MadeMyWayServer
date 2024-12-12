import NodeMailer from "nodemailer"

interface SendEmailOptions {
  to: string
  subject: string
  html: string
}

export const sendEmail = async ({
  to,
  subject,
  html,
}: SendEmailOptions): Promise<void> => {
  try {
    const transporter = NodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "desaivivek11@gmail.com",
        pass: "ejng gnal teke mksz",
      },
    })

    const mailOptions = {
      from: "desaivivek11@gmail.com",
      to,
      subject,
      html,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log("Email has been sent:", info.response)
  } catch (error: any) {
    console.error("Error sending email:", error.message)
    throw new Error("Failed to send email")
  }
}
