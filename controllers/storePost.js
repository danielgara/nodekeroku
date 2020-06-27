const BlogPost = require("../models/BlogPost")
const path = require("path")

module.exports = async function (req, res){
    let image = req.files.image;
    image.mv(path.resolve(__dirname,"public/img", image.name), async function
        (error) {
            await BlogPost.create({
                title: req.body.title,
                body: req.body.body,
                userid: req.session.userId,
                image: "img/"+image.name
            })
            res.redirect("/")
        }
    )
}