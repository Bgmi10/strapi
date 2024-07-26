// ./api/payment/controllers/payment.js
const stripeService = require('../services/stripe');

module.exports = {
  async createPaymentIntent(ctx) {
    try {
      const { amount } = ctx.request.body;
      if (!amount) {
        return ctx.badRequest('Amount is required');
      }
      const paymentIntent = await stripeService.createPaymentIntent(amount);
      ctx.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      ctx.badRequest('Payment creation failed');
    }
  },
};
