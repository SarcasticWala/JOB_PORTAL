import mailsender from './utils/mailsender.js'

const testMail = async () => {
    const email = 'recipient@example.com' // Replace with the recipient's email address
    const title = 'Test Email'
    const body = '<h1>This is a test email</h1><p>Testing the mailsender function.</p>'

    try {
        const info = await mailsender(email, title, body)
        console.log('Email sent successfully:', info)
    } catch (error) {
        console.error('Error sending email:', error)
    }
}

testMail()
