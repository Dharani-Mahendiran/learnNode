import express from 'express';
const router = express.Router();
import { getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie } from '../controllers/movies.controller.js';

// use multer for file uploads
import multer from 'multer';
const upload = multer();

router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', addMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;