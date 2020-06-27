const User = require("../models/User")

module.exports = async function (req, res){
    await User.create(req.body, function(error, user){
        if(error){
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            req.flash("validationErrors", validationErrors)
            req.flash("data", req.body)
            return res.redirect("/auth/register")
        }
        res.redirect("/")
    })
}