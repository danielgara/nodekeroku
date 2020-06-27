const express = require("express")
const ejs = require("ejs")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const expressSession = require("express-session")
const flash = require("connect-flash")

/* include controllers */
const homeController = require("./controllers/home") 
const aboutController = require("./controllers/about") 
const contactController = require("./controllers/contact") 
const newPostController = require("./controllers/newPost") 
const getPostController = require("./controllers/getPost") 
const storePostController = require("./controllers/storePost") 
const newUserController = require("./controllers/newUser") 
const storeUserController = require("./controllers/storeUser") 
const loginController = require("./controllers/login") 
const loginUserController = require("./controllers/loginUser") 
const logoutController = require("./controllers/logout") 
const notFoundController = require("./controllers/notFound") 

/* include middleware */
const validateMiddleware = require("./middleware/validationMiddleware") 
const authMiddleware = require("./middleware/authMiddleware") 
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware") 

mongoose.connect("mongodb+srv://new_root:vdSdRzK2DgMLed1E@cluster0-zni7x.mongodb.net/test",{useNewUrlParser:true, useUnifiedTopology: true})

const app = express()
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use("/posts/store",validateMiddleware)
app.use(expressSession({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

global.loggedIn = null
app.use("*", function(req,res,next){
    loggedIn = req.session.userId
    next()
})

/* Routes */
app.get('/', homeController)
app.get('/about', aboutController)
app.get('/contact', contactController)
app.get('/posts/new', authMiddleware, newPostController)
app.get('/post/:id', getPostController)
app.post('/posts/store', authMiddleware, storePostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.get('/auth/logout', authMiddleware, logoutController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.use(notFoundController)

app.listen(3000)