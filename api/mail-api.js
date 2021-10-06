const { myCache } = require("../routes/santaForm");
const nodemailer = require("nodemailer");

module.exports = async function doStuff() {
  const allKeys = myCache.keys();
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  const contentMail = [];
  if (allKeys.length) {
    console.log(allKeys.length);
    const infosUsers = allKeys.map((key) => {
      const { name, address, wishList } = myCache.get(key);
      return `<h1>${name} who live in ${address} want :</h1><br><h3>${wishList}</h3>`;
    });
    contentMail.push(...infosUsers);
    console.log(contentMail);
  }
  let message = {
    from: "do_not_reply@northpole.com",
    to: "santa@northpole.com",
    subject: `There is still ${allKeys.length} pending requests`,
    text: "Hello to myself!",
    html: `${contentMail}`,
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log("Error occurred. " + err.message);
      return process.exit(1);
    }
  });
};
