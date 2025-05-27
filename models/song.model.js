import {Schema, model} from 'mongoose';

const schema = new Schema({
    name: {
        required:true,
        type:String
    },
    description: {
        required:true,
        type:String
    },
    is_active:{
        type:Boolean,
        default:true
    }
});

schema.index({ name: 1 }, { unique: true, partialFilterExpression: { is_active: true } });

const Song = model('Song', schema);
export default Song;