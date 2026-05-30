
import nodemailer from 'nodemailer';
import { env } from '../config/index.js';
import Mail from 'nodemailer/lib/mailer/index.js';



const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:env.EmailUser,
        pass:env.EmailPass
    }
})

 export let sendEmail = async({
     to,
     subject,
     html,
 }: Mail.Options): Promise<void>=>
     {
         const info = await transporter.sendMail({
            from: `Social Meadia App <${env.EmailUser}>`,
            to,
            subject,
            html,
         })

         console.log("Message sent:", info.messageId);
         
    }