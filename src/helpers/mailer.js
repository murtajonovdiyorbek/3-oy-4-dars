
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: 'src/.env' });

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

async function sendEmailMessage(to, username) {
    return await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: 'Imtihon natijalari',
        html: `
            <h2>Assalom alaykum, ${username}!</h2>
            <p>Men Diyorbek Muratjonov, Vazifa tayor ustoz.</p>
        `
    });
}

export default sendEmailMessage;
