var todoserver=require('../dao/todoserver.js')
module.exports=function(app){
    app.post('/delTodo', (req,res) => {
        todoserver.delTodo(req,res)
    })
}