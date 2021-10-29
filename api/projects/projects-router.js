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

router.post('/', (req, res, next)=>{
    const {name, description}=req.body
    if(!name || !description){
        res.status(400).json({
            message:'need name and description for the project'})
    } else {
        Projects.insert(req.body)
        .then(newProject=>{
            res.status(201).json(newProject)
        })
        .catch(next)
    }
})




router.use((err, req, res, next)=>{
    res.status(err.status || 500).json({
      customMessage: "something bad happend ",
      message: err.message,
      stack:err.stack,
    })
  })
module.exports=router