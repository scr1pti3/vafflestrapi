'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/services.html#core-services)
 * to customize this service
 */
const apiKey = process.env.MG_API_KEY || '21c6aa4a9f50c161e23cefe222fcb308-e5e67e3e-2d0fd4e5';
const domain = process.env.MG_DOMAIN || 'mail.vafflehauz.com';
const mailgun = require('mailgun-js')({
  apiKey,
  domain
});


module.exports = {
  sendEmail(visitorData, companyData) {
    return new Promise((resolve, reject) => {
      strapi.log.info(`[Sendmail] Sending Mail to ${companyData.to}`);
      strapi.plugins['email'].services.email.send(companyData)
        .then(() => {
          strapi.log.info(`[Sendmail] Mail sent to ${companyData.to}`);
          strapi.log.info(`[Mailgun] Sending Mail to ${visitorData.to}`)
          mailgun.messages().send(visitorData, (err, body) => {
            if (err) {
              strapi.log.error(`[Mailgun] Failed to send email to ${visitorData.to}`)
              console.error(err);
            }
            else strapi.log.info(`[Mailgun]: Mail sent to ${visitorData.to}`);
          });

          resolve({message: "Mail sent"});
        })
        .catch((err) => {
          strapi.log.error(`[Sendmail] Failed to send email to ${companyData.to}`);
          reject(err)
        });
    });
  }
};
