import mongoose from "mongoose";

mongoose.connect('mongodb+srv://kamblechinmay8:Chinmay%408@cluster0.kgcnr.mongodb.net/Databases').then(() =>{console.log('Connected to Mongo')});


const UserSchema = new mongoose.Schema({
    username : {type : String, required: true, unique: true},
    password :{type : String, required: true}
})

const TagSchema = new mongoose.Schema({

})

const ContentSchema = new mongoose.Schema({
    title : {type: String, required: true},
    link : {type: String, required: true},
    tags : [{type : mongoose.Types.ObjectId, ref : 'Tag'}],
    userID : {type : mongoose.Types.ObjectId, required: true , ref : 'User'},
    type: {type: String, required: true}
})

const LinkSchema = new mongoose.Schema({
    link : {type: String, required: true ,unique: true},
    userID : {type : mongoose.Types.ObjectId, required: true, ref : 'User', unique: true}
})


  


export const TagModel =  mongoose.model('Tag', TagSchema)
export const ContentModel = mongoose.model('Content', ContentSchema)
export const UserModel = mongoose.model('User', UserSchema)
export const LinkModel = mongoose.model('Link', LinkSchema)