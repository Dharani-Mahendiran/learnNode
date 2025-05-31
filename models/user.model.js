import {Schema, model} from 'mongoose';

const schema = new Schema({
   name:{
    required:true,
    type:String
   },
   email:{
    required:true,
    type:String
   },
   country_code:{
    required:true,
    type:String
   },
   mobile_number:{
    required:true,
    type:String
   },
   dob:{
    required:true,
    type:Date
   },
   password:{
    required:true,
    type:String
   },
   is_active:{
    type:Boolean,
    default:true
   }
}, {timestamps:true});

schema.index({email:1}, {unique:true, partialFilterExpression:{is_active:true}});
schema.index({mobile_number:1}, {unique:true, partialFilterExpression:{is_active:true}});

const User = model('User', schema);
export default User;