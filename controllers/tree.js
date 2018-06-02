var express=require("express");

var bodyParser=require('body-parser');
var fs =require("fs");
var router=express.Router();
var multer=require("multer");
var mongoose=require("mongoose");
var uploadMid=multer({

  dest:"./public/imgs"
});

//to get data from request body
var bodyParserMid=bodyParser.urlencoded();

//var catModel=mongoose.model("category");

router.get('/add',function(req,resp){
  mongoose.model("nodes").find({},function(err,result){
  if (!err)
  
   //resp.json(result);
   resp.render('Tree/add',{data:result});
  else
    resp.json(err);
  
  
  
  })


});


router.post('/add',uploadMid.single('avatar'),function(req,resp){
var nodeModel=mongoose.model("nodes");
var image_name=req.file.path;

//resp.json(req.body);
mongoose.model("nodes").find({name:String(req.body.Parent)}
,function(err,doc){
  //resp.json(doc);
  console.log(doc[0]._id);
  var node=new nodeModel({
    _id:Number(req.body.id),
    name:String(req.body.name),
    Parent_id:doc[0]._id,
    picture:req.file.filename
  });
  node.save(function(err,doc){
    //resp.json(doc);
  if(!err){
    resp.redirect("/Tree/list");
  }else{
    resp.json(err);
  }
  });

});
//resp.json(req.body);

});




router.get('/list/:page?',function(req,resp){

var pagenumber=1;
if(req.params.page)
  pagenumber=req.params.page;
  console.log(pagenumber);
  //resp.locals={name:"yasmeen"}
mongoose.model("nodes").paginate({},
  {page: pagenumber , limit: 5},function(err,result){
if (!err)




 //resp.json(result);
 resp.render('Tree/list',{data:result, msg:req.flash('msg')});
else
  resp.json(err);



})

});
router.post('/list',bodyParserMid,function(req,resp){

resp.render('Tree/list');


});
router.get('/ParentOf/:id',function(req,resp){
  mongoose.model("nodes").findOne({_id:Number(req.params.id)}
  ,function(err,doc){
    console.log(doc);
  });
});




module.exports=router;
