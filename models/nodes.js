



var mongoose=require("mongoose");
var mongoosePaginate=require("mongoose-paginate");
var schema=mongoose.schema;
var nodes=new mongoose.Schema({
  _id:Number,
  name:String,
  Parent_id:{
    type:Number,
    ref:"nodes"
},
  picture:String,
});
nodes.plugin(mongoosePaginate);

mongoose.model("nodes",nodes);


