// fxn that can be used in the views by passing them to locals

const env = require("./environment");
const fs = require("fs");
const path = require("path");

//  depending on env will give css js images file to views from asset folder not the upload one
// will send the fxn to locals of the app so fxn need to take app as input .
module.exports = (app) => {
  app.locals.assetsPath = function (filePath) {
    if (env.name == "development") {
      return filePath;
    }
    return (
      "/" +
      JSON.parse(
        fs.readFileSync(
          path.join(__dirname, "../public/assets/rev-manifest.json")
        )
      )[filePath]
    );
  };
};
