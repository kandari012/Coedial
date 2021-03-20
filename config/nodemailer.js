const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");

//define how the mail communication will take place
let transporter = nodemailer.createTransport({
  //for setting gmail
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    //id with which you will be sending those mails
    user: "rahulkandari012",
    pass: "Kandari@123",
  },
});
// to define we will be using ejs and template rendering engine for sending HTMl email
let renderTemplate = (data, relativePath) => {
  let mailHTML; //will store te html sent in the mail
  ejs.renderFile(
    //willuse ejs to render data
    path.join(__dirname, "../views/mailers", relativePath), //relative path is place from where this fxn is called
    data, //all data that needed to be filled in ejs
    function (err, template) {
      //call back   //templateis composed of data and path.join
      if (err) {
        console.log("error in rendering template", err);
        return;
      }
      mailHTML = template;
    }
  );
  return mailHTML;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
