const { mongoose } = require("mongoose");

exports.dbConnect = async ()=>{
    try{
        await mongoose.connect("mongodb+srv://rajanchaubey972:Xk1a3jD9436KHcFx@rajancluster1.0xrwrfu.mongodb.net/",{
            dbName:"mongo-authen",
          });
          console.log("successfully connected to Mongoose");
    }catch(err){
        console.log(err.message);
    }
}