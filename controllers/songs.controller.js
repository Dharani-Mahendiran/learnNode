import models from '../models/main.model.js';

export const getSongs = async(req, res) => {
   try{
      const songs =  await models.Song.find();
      if(!songs || songs.length === 0){
         return res.status(200).json({message: `No songs found`});
      }
      return res.status(200).json({message: `Songs fetched`, songs})

   }catch(error){
      return res.status(500).json({message:`Get all songs failed ${error.message}`});
   }

};
export const getSongById = async (req,res) => {
   try{
       const song = await models.Song.findById(req.params.id);
       if(!song){
         return res.status(404).json({message: `Song not found with id ${req.params.id}`});	
       }
         return res.status(200).json({message: `Song fetched`, song});
   }catch(error){
      return res.status(500).json({message:`Get song by id failed ${error.message}`});
   }
};

export const createSong = async (req, res) => {
   try{
      const createSong = await new models.Song({
            name: req.body.name,
            description: req.body.description
      }).save();
      return res.status(201).json({message:`Song created`, createSong});
   }catch(error){
     return res.status(500).json({message :`Create song api failed ${error.message}`});
   }
};

export const updateSong = async (req, res) => {
    try{
         const song =  await models.Song.findByIdAndUpdate(req.params.id, req.body, {new:true});
         if(!song){
            return res.status(404).json({message: `Song not found with id ${req.params.id}`});
         }
         return res.status(200).json({message: `Song updated`, song});
    }catch(error){
      return res.status(500).json({message:`Update song failed ${error.message}`});
    }
};

export const deleteSong = async (req, res) => {
      try{
              const song = await models.Song.findByIdAndUpdate(
      req.params.id,
      { is_active: false },
      { new: true }
    );

         //   findByIdAndDelete
           if(!song){
              return res.status(404).json({message: `Song not found with id ${req.params.id}`});
           }

             return res.status(200).json({message: `Song deleted successfully`, song});
      }catch{
         return res.status(500).json({message:`Delete song failed ${error.message}`});
      }
};