var achserver=require('../dao/achserver.js')
module.exports=function(app){
    app.post('/getAchbytime', (req,res) => {
        achserver.getAchbytime(req,res)
    })
}