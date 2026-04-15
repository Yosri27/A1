
import nodemailer from 'nodemailer';
import { env } from '../config/env.services.js';
import { Mail } from 'nodemailer/lib/mailer';


export let sendEmail = async({
    to,
    subject,
    html,
}: Mail.Options): Promise<void>=>
    {
        const info = await nodemailer.createTransport({

        })
    }