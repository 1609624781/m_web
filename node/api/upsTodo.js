var boardserver=require('../dao/todoserver.js')
module.exports=function(app){
    app.post('/upsTodo', (req,res) => {
        boardserver.upsTodo(req,res)
    })
}