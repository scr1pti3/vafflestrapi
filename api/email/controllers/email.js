'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  send(ctx) {
    console.log("/api/email/controller/email.js ctx.request.body",ctx.request.body);
    const {
      name,
      email,
      phone,
      text
    } = ctx.request.body;
    const to = process.env.ORG_EMAIL || "contact@vafflehauz.org";
    const from = email;
    console.log('controllers', from);

    const subject = "Submission Form";

    return strapi.services.email.sendEmail(to, subject, from,text);
  }
};
