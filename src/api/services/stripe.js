// ./api/payment/services/stripe.js
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Ensure you are using the right secret key

module.exports = {
  createPaymentIntent: async (amount) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Convert amount to cents
        currency: 'inr',
        payment_method_types: ['card'],
      });
      return paymentIntent;
    } catch (error) {
      throw new Error(`Stripe error: ${error.message}`);
    }
  },
};
