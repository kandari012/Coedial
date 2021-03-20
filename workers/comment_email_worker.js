const queue = require("../config/kue");

const commentsMailer = require("../mailers/comments_mailer");
//every worker has a process fxn whenever a new task is added to the queue need to run the code inside process fxn
//first argumnet is name of queue ,

queue.process("emails", function (job, done) {
  //job.data is data sent comment
  console.log("emails worker is processing a job", job.data);
  //calling mailer from queue instead of from controller
  commentsMailer.newComment(job.data);
  done();
});
