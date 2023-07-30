const mongoDb=require('mongodb');
const dotenv=require('dotenv');
dotenv.config();

let _db;

const MongoClient=mongoDb.MongoClient;
const mongoConnect=(cb)=>{
    MongoClient.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster1.dx1nxb0.mongodb.net/?retryWrites=true&w=majority`)
    .then(client=>{
        console.log("connected!!!");
        _db=client.db();
        console.log(client);
        cb();
        
    })
    .catch(err=>{
        console.log(err);
        throw err;
    });
};

const getDb=()=>{
    if(_db){
        return _db;
    }
    throw 'db connection not found';
}
module.exports ={mongoConnect,getDb};
