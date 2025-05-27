import {Schema, model} from 'mongoose';

const schema = new Schema({
    name : {
        required:true,
        type:String,
        unique:true,
    },
    description:String
})
const Movie = model('Movie', schema);
export default Movie;