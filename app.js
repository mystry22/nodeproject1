const express = require('express');
const session  = require('express-session');
const bodParser = require('body-parser');
const red = require('express-redirect');
const router = express.Router();
const app = express();




app.use("/assets",express.static('assets'));
var jsonParser = bodParser.json();
var url = bodParser.urlencoded({extended: false});
app.use(session({secret:'mysecret',saveUninitialized: true,resave:true}));

app.use(express.static(__dirname +'/views'));

var sess;

router.get('/', (req,res) =>{
    sess = req.session;

    
    if(sess.email){
        res.redirect('/admin');
        res.end();
    }else{
        res.sendFile(__dirname + '/views/login.html');
    }
    
});

router.get('/logout', (req,res)=>{
 req.session.destroy((err )=>{
    if(err){
        return console.log(err);
    }else{
        res.redirect('/');
    }
    });
});



router.get('/admin', (req,res)=>{
      sess = req.session;
      
      if(sess.email){
        res.write(`<h1>hello ${sess.email} </h1><br><a href='/logout'>Logout</a>`);   
        res.end();
        //res.json();
        //res.send();
        //res.end();
        //next js
        //adv and dis of res.json and send error response code and meaning
      }else{
          res.redirect('/');
          res.end();
      }
      

  

});

router.post('/login', url, (req,res)=>{
    sess = req.session;
    sess.email = req.body.user;
    res.redirect('/admin');
   
});

app.use('/', router);
app.listen(4000);
console.log('listening to port 4000');



