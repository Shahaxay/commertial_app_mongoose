const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const OrderSchema=new Schema({
    //I want to get all the data of the product and username and userId in user field
    orderItem:[{
        product:{type:Object, required:true},
        quantity:{type:Number,required:true}
    }],
    user:{
        name:{
            type:String,
            required:true
        },
        userId:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    }

})

module.exports=mongoose.model('Order',OrderSchema);