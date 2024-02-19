const nodemailer = require('nodemailer');
const {User} = require('../Model/userModel');

const Sendmail = async (pid, userId) => {
    try {
        // Node mailer
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS,
            },
        });

        // Retrieve the email addresses of the users with provided ids (pid and userId)
        const [user1, user2] = await Promise.all([
            User.findById(pid).select('email name username'),
            User.findById(userId).select('email name username')
        ]);

        // Compose email content
        const mailOptions1 = {
            from: process.env.AUTH_EMAIL,
            to: user1.email,
            subject: 'You have a crush!',
            text: `You and ${user2.name} (${user2.username}) have a crush on each other!!! \n It's time to go and confess you love 😀 \n Best wishes from team Kitty Love💕`
        };

        const mailOptions2 = {
            from: process.env.AUTH_EMAIL,
            to: user2.email,
            subject: 'You have a crush!',
            text: `You and ${user1.name} (${user1.username}) have crush a on each other!!! \n It's time to go and confess you love 😀 \n Best wishes from team Kitty Love💕`
        };

        // Send emails
        await Promise.all([
            transporter.sendMail(mailOptions1),
            transporter.sendMail(mailOptions2)
        ]);

    } catch (error) {
        console.error('Error sending emails:', error);
    }
};

module.exports = Sendmail;
