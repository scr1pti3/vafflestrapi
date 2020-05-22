'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/services.html#core-services)
 * to customize this service
 */
const apiKey = process.env.MG_API_KEY || '21c6aa4a9f50c161e23cefe222fcb308-e5e67e3e-2d0fd4e5';
const domain = process.env.MG_DOMAIN || 'mail.vafflehauz.org';
const mailgun = require('mailgun-js')({
  apiKey,
  domain
});


module.exports = {
  sendEmail(visitorData, companyData) {
    return new Promise((resolve, reject) => {
      strapi.plugins['email'].services.email.send(companyData)
        .then(() => {
          mailgun.messages().send(visitorData, (err, body) => {
            if (err) console.log("Failed to send a reply");
            else console.log("Sent a reply");
          });
          resolve({message: "Mail sent"});
        })
        .catch(() => reject({
          message: "Mail is not sent"
        }));
    });
  }
};
