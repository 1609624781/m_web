var boardserver=require('../dao/todoserver.js')
module.exports=function(app){
    app.post('/upfTodo', (req,res) => {
        boardserver.upfTodo(req,res)
    })
}