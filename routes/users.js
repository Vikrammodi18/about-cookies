const express= require('express')
const router = express.Router()


router.get('/',(req,res)=>{
    res.send('you are in home route')
})

router.get('/about',(req,res)=>{
    res.send('you are in about route')
})

router.get('/details',(req,res)=>{
    res.send('you are in details route')
})



module.exports = router