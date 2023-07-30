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
  }
});



// const mongoDb=require('mongodb');
// const database=require('../util/database');

// class Product{
//   constructor(title,price,description,imageUrl,id,userId){
//     this.title=title,
//     this.price=price,
//     this.description=description,
//     this.imageUrl=imageUrl,
//     this._id=id?new mongoDb.ObjectId(id):null,
//     this.userId=userId
//   }

//   save(){
//     const db=database.getDb();
//     if(this._id){
//       //update
//       return db.collection('Product').updateOne({_id:this._id},{$set:this});
//     }else{
//       //insert
//       return db.collection('Product').insertOne(this);
//     }
//   }

//   static findAll(){
//     const db=database.getDb();
//     return db.collection('Product').find().toArray();
//   }

//   static findByPk(prodId){
//     const db=database.getDb();
//     return db.collection('Product').findOne({_id:new mongoDb.ObjectId(prodId)});
//   }

//   static deleteById(prodId){
//     const db=database.getDb();
//     return db.collection('Product').deleteOne({_id:new mongoDb.ObjectId(prodId)});
//   }
// }
module.exports=mongoose.model('Product',ProductSchema);