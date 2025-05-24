import Movie from '../models/movie.model.js';

export const getMovies = (req, res) => {
   res.json(req.body);
};
export const addMovie = async (req, res) => {
    try{
        const data = new Movie({
            name : req.body.name,
            description: req.body.description
        });
        await data.save();
        res.status(201).json({'message' : 'Moview Created Successfully', data})
    }catch(error){
        res.status(400).json(`Create movie failed ${error.message}`);
    }
};
export const updateMovie = (req, res) => {

};
export const deleteMovie = (req, res) => {
    
};