module.exports.home = function (req, res) {
  console.log(req.cookies);
  res.cookie("user", 6);
  return res.render("home", {
    title: "Home",
  });
};

//module.exports.actionNmae=function(req,res)
{
}
