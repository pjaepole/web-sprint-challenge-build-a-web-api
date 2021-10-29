// Write your "projects" router here!
const express = require('express')
const {validateProjectID}=require('./projects-middleware')
const Projects = require('./projects-model')
const router = express.Router()

router.get('/', async (req,res,next)=>{
    await Projects.get()
    .then(projects=>{
        res.status(200).json(projects)
    })
    .catch(next)
})

router.get('/:id', validateProjectID, (req,res)=>{
    res.status(200).json(req.project)
})

router.post('/', async (req, res, next)=>{
    const {name, description}=req.body
    if(!name || !description){
        res.status(400).json({
            message:'need name and description for the project'})
    } else {
        await Projects.insert(req.body)
        .then(newProject=>{
            res.status(201).json(newProject)
        })
        .catch(next)
    }
})

router.put('/:id', validateProjectID, (req, res, next)=>{
    const {name, description, completed}=req.body
    if(!name || !description || !completed){
        res.status(400).json({message: "missing name, description, completed"})
    } else {
    Projects.update(req.params.id,req.body)
    .then(updatedProject=>{
        res.status(200).json(updatedProject)
    })
    .then(response=>{
        return Projects.get(req.params.id)})
    .catch(next)}
})

router.delete('/:id', validateProjectID, (req, res, next)=>{
    Projects.remove(req.params.id)
    .then(deletion=>{
        res.status(200).json({message: "project deleted"})
    })
    .catch(next)
})

router.get('/:id/actions',validateProjectID, (req,res,next)=>{
    Projects.getProjectActions(req.params.id)
    .then(result=>{
        res.status(200).json(result)
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