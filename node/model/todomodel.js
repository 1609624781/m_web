var db=require('../config/db.js')
var mongoose=require('mongoose')

var Schema=mongoose.Schema;
var UserSchema=new Schema({
    title:String,
    description:String,
    starttime:String,
    endtime:String,
    userID:Number,
    class:String,
    category:String,
    priority:Number,
    done:Boolean
});
module.exports=db.model('todo',UserSchema);