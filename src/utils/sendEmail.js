import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


export const sendVerificationEmail = async (to, username, otp) => {

    const emailHtml = ` 
        <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 20px;">

            <!-- Container to center content and add padding -->
            <div style="max-width: 600px; background-color: #ffffff; padding: 20px; border-radius: 8px; margin: auto; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                
                <!-- Welcome header -->
                <h2 style="color: #007acc; text-align: center; font-size: 24px; margin-top: 0;">
                Welcome, ${username}!
                </h2>

                <!-- Main message -->
                <p style="font-size: 16px; line-height: 1.5; color: #555;">
                Thank you for signing up. Please verify your email by using this OTP:
                <span style="display: inline-block; background-color: #f0f8ff; color: #007acc; font-weight: bold; padding: 10px 15px; border-radius: 5px; font-size: 18px;">
                    ${otp}
                </span>
                </p>

                <!-- Disclaimer -->
                <p style="font-size: 14px; color: #999; margin-top: 20px;">
                If you didn’t request this, you can safely ignore this email.
                </p>

                <!-- Signature -->
                <p style="font-size: 16px; color: #333; margin-top: 40px;">
                Best regards,<br />
                <strong>Zaheer Khan</strong><br />
                ProductExityManagement
                </p>

            </div>

        </body>
        </html>

    `;

    // Mail options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Please Verify Your Email',
        html: emailHtml
    };

    // Send email
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${to}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};


