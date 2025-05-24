import express from 'express';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 3000;


dotenv.config();

app.use(express.json());

app.get('/', (req,res)=> {
    res.json('Hello World');
})


app.listen(PORT, ()=>{
     console.log(`Server running on Port http://localhost:${PORT}`)
})