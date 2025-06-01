import express from 'express';
import morgan from 'morgan';
import 'dotenv/config'; 
import {connectDB} from './config/db.js';
import movieRoute from './routes/movies.route.js';
import songRoutes from './routes/songs.route.js';
import userRoutes from './routes/user.route.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/movies', movieRoute);
app.use('/songs', songRoutes);
app.use('/user', userRoutes);

// handle 404 routes
app.use((req,res) => {
    res.status(404).json({
        success:false,
        status_code: 404,
        message: 'Route not found',
        errors: null
    });
});


connectDB().then(() =>{
    app.listen(PORT, ()=>{
     console.log(`Server running on Port http://localhost:${PORT}`)
    })
});
