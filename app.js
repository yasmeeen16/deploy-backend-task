

var express=require('express');


var server=express();
var authRout=require("./controllers/auth");
var TreeRout=require("./controllers/tree");
var session=require('express-session');
var flash=require("connect-flash");
var mongoose=require("mongoose");
var mod=require('./models/nodes');

server.use(session({
  secret:"@#%#$^$%",
  cookie:{maxAge:1000*60*60*24*7}
}));

server.use(express.static('public'));

//open to connection auth mod
//mongoose.connect("mongodb://username:password@localhost:27017/iti_38_blog");
mongoose.connect("mongodb://localhost:27017/Tree");



server.use(flash());
server.use('/auth',authRout);
//midle ware
server.use(function(req,resp,next){
if(!(req.session.username && req.session.password))
{   req.flash.msg="invalid usermame or password";
    resp.redirect('/auth/login');
}else {
  resp.locals={
    name:req.session.username
  }

  next();

}

});


server.use('/Tree',TreeRout);
server.set('view engine','ejs');
server.set('views','./views');




server.listen(9090,function(){

console.log("start ................");


});
