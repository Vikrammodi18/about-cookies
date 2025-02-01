const express= require('express')
const app = express()
const usersRoute = require('./routes/users.js')
const postsRoute = require('./routes/posts.js')
const cookieParser = require('cookie-parser')

app.use(cookieParser("secretcode"))

app.get('/signedCookies',(req,res)=>{
    res.cookie("made-in","India",{signed:true})
    res.send('signed cookies')
})
app.get('/verify',(req,res)=>{
    console.log(req.signedCookies)
    res.send("verified")
})

app.get('/getcookies',(req,res)=>{
    res.cookie("name","vikram")
    res.cookie("greet","Jai shree Ram")
    res.send("get your cookies")
})
app.get('/greet',(req,res)=>{
    const{name} = req.cookies
    res.send(`hii,${name}`)
})
app.get('/',(req,res)=>{
    console.dir(req.cookies)
    res.send('i am root route')
})

app.use('/users',usersRoute)
app.use('/posts',postsRoute)

app.listen(3000,()=>{
    console.log("your app runing at 3000");
    
})