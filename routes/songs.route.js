import express from 'express';
const router = express.Router();
import { getSongs, getSongById, createSong, updateSong, deleteSong } from '../controllers/songs.controller.js';

router.get('/', getSongs);
router.get('/:id', getSongById);
router.post('/', createSong);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);

export default router;