const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const dotenv=require('dotenv');

const errorController = require('./controllers/error');
const User=require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//adding user for each request through middleware through which request always funneled through
app.use(async(req, res, next) => {
    try{
        const user=await User.findById('64c610f6072eadaf0578d06f');
        req.user=user; //it give mongoose object
        next(); 
    }
    catch(err){
        console.log(err);
    }
})

app.use('/admin', adminRoutes); 
app.use(shopRoutes);

// app.use(errorController.get404);
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster1.dx1nxb0.mongodb.net/shop?retryWrites=true&w=majority`)
.then(async()=>{
    const user=await User.findOne();
    if(!user){
        const newUser=new User({name:'Akshay',email:'akshayshah@gmail.com',cart:{items:[]}});
        await newUser.save();
    }
    app.listen(3000,()=>console.log('listening to 3000...'));
})
.catch(err=>console.log(err)); 
