'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const replyEmail = process.env.REPLY_EMAIL || "no-reply@vafflehauz.com";

module.exports = {
  async send(ctx) {
    try {
      strapi.log.info("POST /email-send RECEIVED", ctx.request.body);
      const {
        name: visitorName,
        email: visitorEmail,
      } = ctx.request.body;

      const companyData = {
        to: visitorEmail,
        from: replyEmail,
        subject: "We got your message!",
        template: "vafflehauz_auto_reply",
        "v:name": visitorName,
        "v:businessHours": "9 AM - 5 PM"
      };

      await strapi.services.email.create(ctx.request.body);
      await strapi.services.email.sendEmail(companyData);
      return {message: "Query sent."};
    } catch (err) {
      ctx.response.status = 503;

      strapi.log.error(err);
      return {message: "Query failed to send, try again later."};
    }
  }
};
