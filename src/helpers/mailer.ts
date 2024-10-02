import User from "@/models/userModel";
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 36000000 })
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 36000000 })
    } else {

    }
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "cbd8b6bb0d7419",
        pass: "6a574ea44888ee"
      }

    });

    const mailOptions = {
      from: "jhatnb@gmail.com",
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `<p>Click here to verify <a href="${process.env.ORIGIN}/verifyemail?token=${hashedToken}" target="_blank"></a> </p>`,
    }

    const info = await transporter.sendMail(mailOptions)

    return info

  } catch (error: any) {
    throw new Error(error.message)
  }
}