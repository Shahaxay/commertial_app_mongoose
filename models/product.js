const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ProductSchema=new Schema({
  title:{
    type:String,
    require:true
  },
  price:{
    type:Number,
    require:true
  },
  description:{
    type:String,
    require:true
  },
  imageUrl:{
    type:String,
    require:true
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
});

module.exports=mongoose.model('Product',ProductSchema);