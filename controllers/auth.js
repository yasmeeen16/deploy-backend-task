//routs of auth
var express=require("express");

var bodyParser=require('body-parser');
//var session=require('express-session');
var router=express.Router();
//to get data from request body
var bodyParserMid=bodyParser.urlencoded();
router.get('/login',function(req,resp){

resp.render('auth/login',{

msg:req.flash("msg")

});


});
router.post('/login',bodyParserMid,function(req,resp){
var username=req.body.username;
var password=req.body.password;
if (username=="yasmeen"&&password==123) {
  req.session.username="yasmeen";
 req.session.password="123";
  resp.redirect('/Tree/add');
}else{

  req.flash("msg","invalid name or passward");
  resp.redirect('/auth/login');
}


router.get('/logout',function(req,resp){

  req.session.destroy();
  resp.redirect("/auth/login");
  
  });




});
router.get('/register',function(req,resp){

    resp.render('auth/register');


});
router.post('/register',bodyParserMid,function(req,resp){




});
router.post('/logout',bodyParserMid,function(req,resp){
req.session.destroy(function(){
  resp.redirect('auth/login');


});



});

module.exports=router;
