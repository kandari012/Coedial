const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

//will create patif path not exist
const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// will add the logs and delete the logs older than a day
const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});

const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "blah",
  db: "codeial_db",
  smtp: {
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
  },
  google_client_id:
    "978512015840-rrbo35fq55bfqghmrv6nbckc1mbuok0k.apps.googleusercontent.com",
  google_client_secret: "a7qCZmMxxPy-fABcj3b4_m6A",
  google_callback_url: "http://localhost:8000/users/auth/google/callback",
  jwt_secret: "codeial",
  morgan: {
    node: "dev",
    options: { stream: accessLogStream },
  },
};

const production = {
  name: "production",
  asset_path: process.env.asset_path,
  session_cookie_key: process.env.session_cookie_key,
  db: process.env.db,
  smtp: {
    //for setting gmail
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      //id with which you will be sending those mails
      user: process.env.user,
      pass: process.env.pass,
    },
  },
  google_client_id: process.env.google_client_id,
  google_client_secret: process.env.google_client_secret,
  google_callback_url: process.env.google_callback_url,
  jwt_secret: process.env.jwt_secret,
  morgan: {
    node: "combined",
    options: { stream: accessLogStream },
  },
};

module.exports =
  eval(process.env.NODE_ENV) == undefined
    ? development
    : eval(process.env.NODE_ENV);
