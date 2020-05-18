'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/services.html#core-services)
 * to customize this service
 */

const DEFAULT_FROM = process.env.DEFAULT_FROM || 'lyerzs29@gmail.com';
const DEFAULT_REPLY_TO = process.env.DEFAULT_REPLY_TO || 'lyerzs29@gmail.com';

module.exports = {
  async sendEmail(to, subject, text) {
    strapi.log.info("Sending Email");
    await strapi.plugins['email'].services.email.send({
      to,
      from: DEFAULT_FROM,
      replyTo: DEFAULT_REPLY_TO,
      subject,
      text
    }).catch((err) => {
      console.error("/api/email/services/email.js err[0].messages", err[0].messages)
    });
    strapi.log.info("Email Sent");
    
    return {
      message: 'Email Sent'
    };
  }
};
