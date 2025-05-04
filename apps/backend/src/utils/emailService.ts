import { Resend } from 'resend';
require("dotenv").config();
const resend = new Resend(process.env.RESEND_API_KEY);

export function sendEmail(SendersEmail: string, name: string, url: string, TimeStamp: string) {
    resend.emails.send({
        from: 'blink<support@krishdev.xyz>',
        to: SendersEmail,
        subject: 'Your Server is Down – Action Required',
        html: `Dear ${name}, We noticed that your server associated with ${url} is currently down. This may impact your services, and we recommend checking your server status as soon as possible. 
        Details: 
        Server Name/IP: ${url} 
        Detected Downtime: ${TimeStamp} 
        Possible Causes: Network issues, configuration changes, or resource limitations. If this was unexpected, please check your server logs or restart your instance. If you need any assistance, feel free to reach out to our support team at support@gmail.com. We’re here to help! 
        Best regards, 
        Team Blink
        `
    });
}

