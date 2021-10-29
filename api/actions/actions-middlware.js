const Actions = require('./actions-model')
const Projects= require('../projects/projects-model')

async function validateActionId(req, res, next){
    try{
        const actions = await Actions.get(req.params.id)
        if(!actions){
            res.status(404).json({message: "action with that ID does not exist"})
        } else {
            req.validatedAction=actions
            next()
        }
    }catch(err){
        res.status(500).json({
            message: 'problem finding action'
          })
    }
}

async function validateProjectId(req, res, next){
    const {project_id, description, notes}=req.body
    if(project_id && description && notes){
        try{  
            const project= await Projects.get(req.body.project_id)
            if(project){
            next()
        } else {
            res.status(400).json({message: "Please provide valid project id"})
        }
    }
        catch(err){next(err)}
    } else {
        res.status(400).json({message: "Please provide valid input"})
    }
    
}
module.exports ={
    validateActionId,
    validateProjectId
}