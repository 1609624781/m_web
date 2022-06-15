var dbmodel=require('../model/achmodel.js');
var Ach=dbmodel.model('ach');

exports.addAch=function (req,res){
    let settime=req.body.settime;
    let userID=1;
    let date=req.body.date;


    let obj=new Ach({
        settime:settime,
        userID:userID,
        date:date
    })

    obj.save(function (err){
        if(err)res.send("error");
        else res.send("success");
    })
}
exports.getAch=function (req,res){
    Ach.find().then(value => {
        res.send(value);
    }).catch(function (err) {
        console.log(err);
    })
}
exports.getAchbytime=async function (req, res) {
    let startdate = new Date(req.body.startdate);
    let enddate = new Date(req.body.enddate);

    let data = await Ach.aggregate([
        {$match: {date: {$gt: startdate, $lt: enddate}}},
        {$group: {_id: "$date", count: {$sum: 1}}}
    ]);
    res.json(data);
    // console.log(res.data);
}