module.exports.profile=function(req,res)
{
    return res.render("users_profile",{
        title:"Profile"
    });
};

module.exports.posts=function(req,res)
{
    return res.end("<h1> UserPosts </h1>");
};
//module.exports.actionNmae=function(req,res){};
