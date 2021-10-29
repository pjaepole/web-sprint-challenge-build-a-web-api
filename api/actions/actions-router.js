const express=require('express')

const Actions =require('./actions-model')
const {validateActionId,
    validateProjectId}= require('./actions-middlware')
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

router.get('/:id',validateActionId, (req, res, next)=>{
    res.json(req.validatedAction)
})

router.post('/', validateProjectId, (req, res, next)=>{
    Actions.insert(req.body)
    .then(newAction=>{
        res.status(201).json(newAction)}
    )
    .catch(next)
})

router.put('/:id',validateActionId, (req, res, next)=>{
    const {project_id,description,notes}=req.body;
    if(project_id && description&& notes){
        Actions.update(req.params.id, req.body)
        .then(action=>{
        if(!action){
            res.status(404).json({message: "action with given id does not exist"})
        } else {
            res.status(200).json(action)
        }
    }).catch(next)
    }else{
        res.status(400).json({message: "missing project id or description or notes"})
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