import nodemailer from "nodemailer";

// Configure transport (You should use environment variables for this in production)
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: "test@ethereal.email", // replace with actual config
        pass: "password123", // replace with actual config
    },
});

export const sendWelcomeEmail = async (email: string, firstName: string) => {
    try {
        const info = await transporter.sendMail({
            from: '"ShopHub Admin" <admin@shophub.com>',
            to: email,
            subject: "Welcome to ShopHub!",
            html: `<h1>Welcome ${firstName}!</h1><p>Thank you for registering at ShopHub. We're excited to have you.</p>`,
        });
        console.log("Welcome email sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending welcome email:", error);
    }
};

export const sendOrderConfirmationEmail = async (email: string, orderId: string, totalAmount: number) => {
    try {
        const info = await transporter.sendMail({
            from: '"ShopHub Admin" <admin@shophub.com>',
            to: email,
            subject: "Order Confirmation - ShopHub",
            html: `<h1>Thank You for Your Order!</h1>
                   <p>Your order (ID: ${orderId}) has been received and is being processed.</p>
                   <p><strong>Total Amount: </strong>$${totalAmount.toFixed(2)}</p>
                   <p>We'll notify you once it ships.</p>`,
        });
        console.log("Order confirmation email sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending order confirmation email:", error);
    }
};
