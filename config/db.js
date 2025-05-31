import mongoose from 'mongoose';

export const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGOURL, {
            tlsAllowInvalidCertificates: true, // try for testing ONLY :used for clearing index cache mongo
        });
        console.log('MongoDB connected successfully');
    }catch(error){
        console.log(`Mongo db conection error ${error.message}`);
        process.exit(1);
    }
}
