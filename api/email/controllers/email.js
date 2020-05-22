'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const replyEmail = process.env.REPLY_EMAIL || "no-reply@vafflehauz.org";
const companyEmail = process.env.COMPANY_EMAIL || "raznan@vafflehauz.org";

module.exports = {
  async send(ctx) {
    try {
      console.log("/api/email/controller/email.js ctx.request.body", ctx.request.body);
      const {
        name: visitorName,
        email: visitorEmail,
        phone: visitorPhone,
        text: visitorMsgText
      } = ctx.request.body;

      const companyMsg = {
        to: visitorEmail,
        from: replyEmail,
        subject: "We got your message!",
        template: "vafflehauz_auto_reply",
        "v:name": visitorName,
        "v:businessHours": "9 AM - 5 PM"
      };

      const visitorMsg = {
        to: companyEmail,
        from: visitorEmail,
        replyTo: visitorEmail,
        subject: "Submission Form",
        text: `${visitorMsgText} Phone: ${visitorPhone}`
      };

      return await strapi.services.email.sendEmail(companyMsg, visitorMsg);
    } catch (err) {
      ctx.response.status = 503;
      return err;
    }
  }
};
