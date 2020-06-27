const BlogPost = require("../models/BlogPost")

module.exports = async function (req, res){
    const blogposts = await BlogPost.find({}).populate("userid")
    res.render("index",{
        posts: blogposts
    })
}