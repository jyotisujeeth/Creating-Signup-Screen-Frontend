const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt')
var app=express();
var cors=require('cors');
const sequelize = require('./util/database');
const Expense = require('./models/expense');
const User = require('./models/user');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/admin/add-expense',(req,res,next)=>{
//     res.sendFile(path.join(__dirname,'views','index.html'))
// })

// app.use('/get-signup',(req,res,next)=>{
//     res.sendFile(path.join(__dirname,'views','index.html'))
//     req.body;
// })

app.get('/get-signup',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','index.html'))
})

app.post('/post-signup',async (req,res,next)=>{
    try{
        var name=req.body.name;
        var email=req.body.email;
        var password=req.body.password;
        // const data= await User.create({name:name, email:email, password:password})
        // res.status(201).json({newExpenseDetail:data})
        const saltrounds = 10;
        bcrypt.hash(password, saltrounds, async (err, hash) => {
            console.log(err)
            await User.create({ name, email, password: hash })
            res.status(201).json({message: 'Successfuly create new user'})
        })
    }
    catch(err){
        // res.sendFile(path.join(__dirname,'views','index.html'))
        // res.send("Email Aldready exists")
        res.status(500).json({
            error:"Email Aldready exists"
        })
    }
})

app.get('/get-login',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','login.html'))
})

app.post('/post-login',async (req,res,next)=>{
    try{
        var email=req.body.email;
        var password=req.body.password;
        const user  = await User.findAll({ where : { email }})
        // console.log(user[0].email);
        // console.log(user[0].password);
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result) => {
                if(err){
                 throw new Error('Something went wrong')
                }
                 if(result === true){
                     return res.status(200).json({success: true, message: "User logged in successfully"})
                 }
                 else{
                 return res.status(400).json({success: false, message: 'Password is incorrect'})
                }
             })
        }
        else{
            return res.status(404).json({success: false, message: 'User Doesnot exitst'})
        }
        // res.status(201).json({message: 'User logged in successfully'})
    }
    catch(err){
        // res.sendFile(path.join(__dirname,'views','index.html'))
        // res.send("Email Aldready exists")
        res.status(500).json({
            error:"User not found"
        })
    }
})

const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);


app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

sequelize.sync()
.then(result=>{
    console.log(result);
})
.catch(err=>{
    console.log(err);
})


app.listen(3000);