const nodeMailer = require("../config/nodemailer");

//another way of exporting
exports.newComment = (comment) => {
  //render template defined in nodemailer config
  let htmlString = nodeMailer.renderTemplate(
    { comment: comment },
    "/comments/new_comments.ejs"
  );

  nodeMailer.transporter.sendMail(
    //send mail predefined fxn
    // mail data
    {
      from: "rahulkandari012@gmail.com",
      to: comment.user.email,
      subject: "New Comment",
      html: htmlString, //use template instead of html text
    }, // callback
    function (err, info) {
      //info has the information of the request send
      if (err) {
        console.log("error in sending mail", err);
        return;
      }
      console.log("mail sent", info);
      return;
    }
  );
};
