import {Schema, model} from 'mongoose';

const schema = new Schema({
    name : {
        required:true,
        type:String
    },
    description:String
})
const Movie = model('Movie', schema);
export default Movie;