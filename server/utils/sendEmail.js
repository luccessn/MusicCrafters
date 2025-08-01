const nodemailer = require("nodemailer");
const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "contactshopmusic@gmail.com",
      pass: "bemp jvhe qzlp zmoq ",
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"MusicCraftersShop" <no-reply@yourshop.com>',
      to,
      subject,
      html,
    });
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; //
  }
};

module.exports = sendEmail;
