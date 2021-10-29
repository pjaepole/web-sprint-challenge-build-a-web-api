const express=require('express')

const Actions =require('./actions-model')

const router = express.Router()

router.get('/', (req, res, next)=>{
    Actions.get()
    .then(response=>{
        if(response){
            res.status(200).json(response)}
        else {
           res.status(404).json(response) 
        }
    })
    .catch(next)
})



router.use((err, req, res, next)=>{
    res.status(err.status || 500).json({
      customMessage: "something bad happend ",
      message: err.message,
      stack:err.stack,
    })
  })
module.exports=router