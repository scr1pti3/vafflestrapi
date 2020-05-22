'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const replyEmail = process.env.REPLY_EMAIL || "no-reply@vafflehauz.com";
const companyEmail = process.env.COMPANY_EMAIL || "roxmagis@ymail.com";

module.exports = {
  async send(ctx) {
    try {
      strapi.log.info("POST /email-send RECEIVED");
      console.log(ctx.request.body);
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
      console.error(err[0]);
      //console.log(err[0].messages);
      return err;
    }
  }
};
