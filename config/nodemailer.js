const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
const env = require("./environment");

//define how the mail communication will take place
let transporter = nodemailer.createTransport(env.smtp);
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
