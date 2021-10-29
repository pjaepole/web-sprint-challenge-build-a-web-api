// Write your "projects" router here!
const express = require('express')
const {validateProjectID}=require('./projects-middleware')
const Projects = require('./projects-model')
const router = express.Router()

router.get('/', (req,res,next)=>{
    Projects.get()
    .then(projects=>{
        res.status(200).json(projects)
    })
    .catch(next)
})
router.get('/:id', validateProjectID, (req,res)=>{
    res.status(200).json(req.project)
})





router.use((err, req, res, next)=>{
    res.status(err.status || 500).json({
      customMessage: "something bad happend ",
      message: err.message,
      stack:err.stack,
    })
  })
module.exports=router