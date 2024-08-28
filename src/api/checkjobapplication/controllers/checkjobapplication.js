// src/api/application/controllers/user-application.js

'use strict';

module.exports = {
  async findUserApplications(ctx) {
    const { userId } = ctx.request.body;

    if (!userId) {
      return ctx.badRequest('User ID is required');
    }

    try {
      const applications = await strapi.db.query('api::jobapplication.jobapplication').findMany({
        where: { userid: userId },
      });

      return ctx.send(applications);
    } catch (err) {
      ctx.throw(500, err.message);
    }
  },
};
