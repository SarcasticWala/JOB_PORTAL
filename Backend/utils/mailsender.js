import nodemailer from 'nodemailer'
import 'dotenv/config'

const mailsender = async(email, title, body) => {
    try {
        // configuration
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587, // default to 587 if not specified
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })
        // send email
        let info = await transporter.sendMail({
            from: 'Ayan Das',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        })
        return info
    } catch (error) {
        console.log(error)
    }
}

export default mailsender