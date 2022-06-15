var boardserver=require('../dao/todoserver.js')
module.exports=function(app){
    app.post('/addTodo', (req,res) => {
        boardserver.addTodo(req,res)
    })
}