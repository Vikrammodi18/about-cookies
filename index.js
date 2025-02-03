const express= require('express')
const app = express()
const usersRoute = require('./routes/users.js')
const postsRoute = require('./routes/posts.js')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const flash = require('connect-flash')
app.use(cookieParser("secretcode"))

app.set("view engine","ejs")
app.set('views',path.join(__dirname,"views"))
app.use(
    session({
      secret: 'your-secret-key', // Secret key to sign the session ID
      resave: false, // Don't save the session if it wasn’t modified
      saveUninitialized: true, // Save a new session even if it’s not modified
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // Session duration (1 day)
        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
        secure: false, // Set to true if using HTTPS
        sameSite: 'lax', // Prevent CSRF attacks
      },
    })
  );
  
  app.use(flash())
  // Route to set session data
  app.get('/setSession', (req, res) => {
    req.session.username = 'vikram'; // Store username in the session
    req.session.isLoggedIn = true; // Store login status
    req.flash("success","you successfully logged in")
    res.redirect('/getSession')
  });
  
  // Route to get session data
  app.get('/getSession', (req, res) => {
    const username = req.session.username; // Retrieve username from the session
    const isLoggedIn = req.session.isLoggedIn; // Retrieve login status
  
    if (username && isLoggedIn) {
        console.log()
       
        res.render('page.ejs',{name:req.session.username,msg:req.flash("success")})
    } else {
      res.send('No session data found. Please log in.');
    }
    
  });
  
  // Route to destroy the session (log out)
  app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.send('Error logging out.');
      }
      res.send('You are now logged out.');
    });
  });
// app.get('/signedCookies',(req,res)=>{
//     res.cookie("made-in","India",{signed:true})
//     res.send('signed cookies')
// })
// app.get('/verify',(req,res)=>{
//     console.log(req.signedCookies)
//     res.send("verified")
// })

// app.get('/getcookies',(req,res)=>{
//     res.cookie("name","vikram")
//     res.cookie("greet","Jai shree Ram")
//     res.send("get your cookies")
// })
// app.get('/greet',(req,res)=>{
//     const{name} = req.cookies
//     res.send(`hii,${name}`)
// })
app.get('/',(req,res)=>{
    console.dir(req.cookies)
    res.send('i am root route')
})

app.use('/users',usersRoute)
app.use('/posts',postsRoute)

app.listen(3000,()=>{
    console.log("your app runing at 3000");
    
})