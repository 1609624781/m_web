var allserver=require('../dao/achserver.js')
module.exports=function(app){
    app.post('/addAch', (req,res) => {
        allserver.addAch(req,res)
    })
}