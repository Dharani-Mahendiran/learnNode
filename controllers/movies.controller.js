import models from '../models/main.model.js';
import {sendSuccess, sendError} from '../config/utils.js';

export const getAllMovies = async (req, res) => {
  try{
    const movies = await models.Movie.find();
      if(!movies || movies.length === 0)
         return sendSuccess(res, 'No movies found');
      return sendSuccess(res, 'Get movies', movies);
  }catch(error){
    return sendError(res, 'Get movies failed', error.message);
  }
};

export const getMovieById = async(req, res) => {
    try{
        const movie = await models.Movie.findById(req.params.id);
        if(!movie)
            res.status(404).json({message: 'Movie not found'});
        return sendSuccess(res, 'Get movie by ID', movie);
    }catch(error){
        return sendError(res, `Get movie by ID failed`, error.message);
    }
}

export const addMovie = async (req, res) => {
    try{
        const data = new models.Movie({
            name : req.body.name,
            description: req.body.description
        });
        await data.save();
        return sendSuccess(res, 'Create movie', data, 201);
    }catch(error){
        return sendError(res, `Create movie failed`, error.message);
    }
};

export const updateMovie = async (req, res) => {
  try{
     const updatedMovie = await models.Movie.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!updatedMovie)
        return sendError(res, `Movie not found`, null, 404);
        return sendSuccess(res, 'Update movie', updatedMovie);
  }catch(error){
        return sendError(res, `Update movie failed`, error.message);
  }
};

export const deleteMovie = async (req, res) => {
    try{
        const movie = await models.Movie.findById(req.params.id);
        if(!movie)
        return sendError(res, `Movie not found`, null, 404);
        await models.movie.deleteOne();
        res.status(200).json({message:'Movie deleted successfully'});
    }catch(error){
        return sendError(res, `Delete movie failed`, error.message);
    }
};