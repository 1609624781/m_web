var dbmodel=require('../model/todomodel.js');
var Todo=dbmodel.model('todo');

//添加todo事件
exports.addTodo=function (req,res){
    let title=req.body.title;
    let des=req.body.des;
    let st=req.body.st;
    let et=req.body.et;
    let userID=1;
    let category=req.body.category;
    let priority=req.body.priority;
    let done=false;

    let obj=new Todo({
        title:title,
        description:des,
        starttime:st,
        endtime:et,
        userID:userID,
        category:category,
        priority:priority,
        done:done
    })
    obj.save(function(err){
        if(err)res.send("error");
        else res.send("success");
    })
}
//删除todo事件
exports.delTodo=function (req,res){
    let title=req.body.title;
    Todo.deleteOne({title:title},function (err){
        if(err){res.send("errer");return;}
        else res.send("success");return;
    })
}
//更新todo为完成状态
exports.upsTodo=function (req,res){
    let title=req.body.title;
    let done=true;
    console.log(title)
    Todo.updateOne({title:title},{done:done},function (err){
        if(err)res.send("error");
        else res.send("success");
    })
}
//更新todo为未完成状态
exports.upfTodo=function (req,res){
    let title=req.body.title;
    let done=false;
    console.log(title)
    Todo.updateOne({title:title},{done:done},function (err){
        if(err)res.send("error");
        else res.send("success");
    })
}
//获取todo列表
exports.getTodos=function (req,res){
    Todo.find({userID:"1"}).then(value=>{
        res.send(value);
    }).catch(function (err){
        console.log(err);
    })
}
exports.titleCheck=function (req,res){
    let title=req.body.title;
    Todo.find({title:title}).countDocuments().then(value=>{
        if(value===0)res.send("success");
        else res.send("error");
    })
}