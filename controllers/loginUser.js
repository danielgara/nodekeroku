const User = require("../models/User")
const bcrypt = require("bcrypt")

module.exports = function (req, res){
    const username = req.body.username
    const password = req.body.password
    User.findOne({username: username}, function(error,user){
        if(user){
            bcrypt.compare(password, user.password, function(error, same){
                if(same){
                    req.session.userId = user._id
                    res.redirect("/")
                }else{
                    res.redirect("/auth/login")
                }
            })
        }else{
            res.redirect("/auth/login")
        }
    })
    /*await User.create(req.body, function(error, user){
        if(error){
            return res.redirect("/auth/register")
        }
        res.redirect("/")
    })*/
}