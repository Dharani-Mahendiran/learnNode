import models from '../models/main.model.js';
import {sendSuccess, sendError} from '../config/utils.js';

export const getSongs = async(req, res) => {
   try{
      const songs =  await models.Song.find();
      if(!songs || songs.length === 0)
            return sendSuccess(res, 'No songs found');
      return sendSuccess(res, 'Get songs', songs);
   }catch(error){
      return sendError(res, 'Get songs failed', error.message);
   }

};
export const getSongById = async (req,res) => {
   try{
       const song = await models.Song.findById(req.params.id);
       if(!song)
         return sendError(res, 'Song not found with id ${req.params.id}', null, 404);
       return sendSuccess(res, 'Get song by id', song);
   }catch(error){
     return sendError(res, 'Get song by id failed', error.message);
   }
};

export const createSong = async (req, res) => {
   try{
      const createSong = await new models.Song({
            name: req.body.name,
            description: req.body.description
      }).save();
      return sendSuccess(res, 'Create song', createSong, 201);
   }catch(error){
       return sendError(res, 'Create song failed', error.message);
   }
};

export const updateSong = async (req, res) => {
    try{
         const song =  await models.Song.findByIdAndUpdate(req.params.id, req.body, {new:true});
         if(!song)
            return sendError(res, 'Song not found with id ${req.params.id}', null, 404);
         return sendSuccess(res, 'Update song', song);
    }catch(error){
       return sendError(res, 'Update song failed', error.message);
    }
};

export const deleteSong = async (req, res) => {
   try{
      const song = await models.Song.findByIdAndUpdate(
         req.params.id,
         { is_active: false },
         { new: true }
      );

      //findByIdAndDelete
      if(!song)
         return sendError(res, 'Song not found with id ${req.params.id}', null, 404);
      return sendSuccess(res, 'Delete song', song);
   }catch{
       return sendError(res, 'Delete song failed', error.message);
   }
};