const Actions = require('./actions-model')

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

module.exports ={
    validateActionId
}