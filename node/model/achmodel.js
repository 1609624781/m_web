var db=require('../config/db.js')
var mongoose=require('mongoose')

var Schema=mongoose.Schema;
var AchSchema=new Schema({
    settime:String,
    userID:Number,
    date:Date
});
module.exports=db.model('ach',AchSchema);