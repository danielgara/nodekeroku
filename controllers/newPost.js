module.exports = function (req, res){
    /* if(req.session.userId){
        res.render("create")
    }else{
        res.redirect("/auth/login")
    }*/
    res.render("create",{
        createPost: true
    })
}