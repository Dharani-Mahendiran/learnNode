import models from '../models/main.model.js';

export const getAllMovies = async (req, res) => {
  try{
     const movies = await models.Movie.find();
     res.status(200).json({message : 'All movies fetched', movies});
  }catch(error){
    res.status(500).json({message :`Get movies failed ${error.message}`});
  }
};

export const getMovieById = async(req, res) => {
    try{
        const movie = await models.Movie.findById(req.params.id);
        if(!movie)
            res.status(404).json({message: 'Movie not found'});
        res.status(200).json({message:'Movie Fetched', movie})
    }catch(error){
        res.status(500).json({message :`Get movie by ID failed ${error.message}`});
    }
}

export const addMovie = async (req, res) => {
    try{
        const data = new models.Movie({
            name : req.body.name,
            description: req.body.description
        });
        await data.save();
        res.status(201).json({message : 'Movie Created Successfully', data})
    }catch(error){
        res.status(500).json({message :`Create movie failed ${error.message}`});
    }
};

export const updateMovie = async (req, res) => {
  try{
     const updatedMovie = await models.Movie.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!updatedMovie)
            return res.status(404).json({message: 'Movie not found'});

     res.status(200).json({message: 'Movie updated successfully', updatedMovie});
  }catch(error){
    res.status(500).json({message :`Movie updated faile ${error.message}`});
  }
};

export const deleteMovie = async (req, res) => {
    try{
        const movie = await models.Movie.findById(req.params.id);
        if(!movie)
            res.status(404).json({message:'Movie not found'});
        await models.movie.deleteOne();
        res.status(200).json({message:'Movie deleted successfully'});
    }catch(error){
        return res.status(500).json({message :`Delete movie failed ${error.message}`});
    }
};