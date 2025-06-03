const axios = require("axios");

const sendEmail = async (templateParams) => {
  try {
    const response = await axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_USER_ID,
        template_params: templateParams,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("EmailJS response:", response.data);
    return response.data;
  } catch (error) {
    console.error("EmailJS error:", error.response?.data || error.message);
    throw error;
  }
};
module.exports = sendEmail;
