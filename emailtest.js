import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: 'smtp.imitate.email',
    port: 587, // or try 465 if secure is true
    secure: false, // Use true for port 465 (SSL)
    auth: {
        user: "Raq2GMHABU24fgGTIDrSVA", // replace with your provided username
        pass: "5YtTctgnGxd6CW1J9pr8",  // replace with your provided password
    },
    tls: {
        rejectUnauthorized: false,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Error verifying SMTP credentials:', error);
    } else {
        console.log('SMTP credentials verified successfully!');
    }
});