const axios = require("axios");

const printfulAPI = axios.create({
  baseURL: "https://api.printful.com/",
  headers: {
    Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
  },
});
// module.exports = printfulAPI;
const createPrintfulOrder = async (orderData) => {
  try {
    const response = await printfulAPI.post("/orders", orderData);
    return response.data;
  } catch (error) {
    console.error(
      "Printful Order Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const buildPrintfulOrderData = (userData, items) => {
  return {
    recipient: {
      email: userData.email,
      name: userData.name,
      country: userData.country,
      state: userData.state,
      city: userData.city,
      address1: userData.address1,
      address2: userData.address2,
      postalCode: userData.postalCode,
      phone: userData.phone,
    },
    items: items.map((item) => ({
      variant_id: item.variantId,
      quantity: item.quantity,
    })),
  };
};

module.exports = {
  printfulAPI,
  createPrintfulOrder,
  buildPrintfulOrderData,
};
