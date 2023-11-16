const express = require('express');
const app = express();
const port  = 4000;

const bodyParser = require('body-parser');

const flash = require('connect-flash')

const cookieSession = require('cookie-session');

app.use(cookieSession({
  maxAge : 30 * 24 * 60 * 60 * 1000,
  name:'session',
  keys : ['RANDOMKEYTHISISJUSTTEST7822901SAKEWRGF']
}))

const persent = [{sugerPersent:{firstVal:500,endVal:400},slove:24},
  {sugerPersent:{firstVal:400,endVal:300},slove:16},
  {sugerPersent:{firstVal:300,endVal:200},slove:8},
  {sugerPersent:{firstVal:200,endVal:150},slove:4}]

let userInfo = {};
let body = {};
app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine','ejs');
app.use(flash());

app.get('/',(req,res)=>{
    res.render('main',{err:req.flash('err')})
})


app.post('/',(req,res)=>{
  console.log(req.body)
if(req.body.SugerPersent > 500 || req.body.SugerPersent < 150){
  req.flash('err','يجب ان تكون نسبة السكر بين 500 و150');
  res.redirect('/')
}else{



persent.forEach(data => {
  if(req.body.SugerPersent >= data.sugerPersent.endVal && req.body.SugerPersent <= data.sugerPersent.firstVal){
      userInfo = data;
      body = req.body;
      console.log(data)
  }
})
res.redirect('/slove')
}
})
app.get('/slove',(req,res)=>{
if(userInfo == {} || body == {}){
  res.redirect('/');
}
else{
    res.render('slove',{data:userInfo,body:body});
    console.log(userInfo)
}

})

app.listen(port,()=>{
    console.log('connected')
})