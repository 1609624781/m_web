var boardserver=require('../dao/todoserver.js')
module.exports=function(app){
    app.post('/getTodos', (req,res) => {
        boardserver.getTodos(req,res)
    })
}