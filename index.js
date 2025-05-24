import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import movieRoute from './routes/movies.route.js';
import songRoutes from './routes/songs.route.js';

const app = express();
const PORT = process.env.PORT || 3000;




app.use(express.json());
app.use('/movies', movieRoute);
app.use('/songs', songRoutes);







app.listen(PORT, ()=>{
     console.log(`Server running on Port http://localhost:${PORT}`)
})