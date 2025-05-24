import express from 'express';
const router = express.Router();
import { getMovies, addMovie, updateMovie, deleteMovie } from '../controllers/movies.controller.js';

router.get('/', getMovies);
router.post('/', addMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;