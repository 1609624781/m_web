var todoserver=require('../dao/todoserver.js')
module.exports=function(app){
    app.post('/titleCheck', (req,res) => {
        todoserver.titleCheck(req,res)
    })
}