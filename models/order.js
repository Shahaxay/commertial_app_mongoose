const { MongoGridFSChunkError } = require('mongodb');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const OrderSchema=new Schema({
    orderItem:[{
        productId:{title:{type:String, required:true}},
        quantity:{type:Number,required:true}
    }],
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }

})

module.exports=mongoose.model('Order',OrderSchema);