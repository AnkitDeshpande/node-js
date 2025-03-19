import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const sendGridApiKey = process.env.SENDGRID_API_KEY;
if (!sendGridApiKey) {
    throw new Error('SENDGRID_API_KEY is not defined in the environment variables');
}

sgMail.setApiKey(sendGridApiKey);

export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
    const msg = {
        to,
        from: 'highwithoutweeds@gmail.com',
        subject,
        text,
        html,
    };

    try {
        await sgMail.send(msg);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};