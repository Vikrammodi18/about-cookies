const express= require('express')
const app = express()
const usersRoute = require('./routes/users.js')
const postsRoute = require('./routes/posts.js')
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.get('/getcookies',(req,res)=>{
    res.cookie("name","vikram")
    res.cookie("greet","Jai shree Ram")
    res.send("get your cookies")
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