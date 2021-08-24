const express =require('express');
const app =express();
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.get('/',(req,res)=>{
	//throw new Error('BROKEN');
	res.render('index');
});

app.get('/login_signup',(req,res)=>{
	res.render('login_signup');
});
app.listen(3000,function(req,res){
	console.log("Hello Spirit ");
});


