const express= require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send("all posts")
})
router.get('/new',(req,res)=>{
    res.send("new posts")
})
router.get('/edit',(req,res)=>{
    res.send("edit posts")
})

module.exports = router
