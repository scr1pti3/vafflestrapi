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
  sendEmail(data) {
    return new Promise((resolve, reject) => {
      strapi.log.info(`[Mailgun] Sending Mail to ${data.to}`)
      mailgun.messages().send(data, (err, body) => {
        if (err) {
          strapi.log.error(`[Mailgun] Failed to send email to ${data.to}`)
          reject(err);
        }
        else {
          strapi.log.info(`[Mailgun]: Mail sent to ${data.to}`);
          resolve(body);
        }
      });
    });
  }
};
