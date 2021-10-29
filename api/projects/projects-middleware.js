// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateProjectID(req, res, next){
    try{
        const project= await Projects.get(req.params.id)
        if(!project){
            next({status:404, message: " project with that ID not found"})
        } else {
            req.project = project
            next();
        }
    }
    catch(err){
        res.status(500).json({
        message: 'problem finding project'
      })}
}

module.exports ={
    validateProjectID
}