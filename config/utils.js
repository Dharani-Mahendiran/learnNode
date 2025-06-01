export const sendSuccess =  (res, message, data = null, statusCode = 200) => {
       res.status(statusCode).json({
         success:true,
         status_code : statusCode,
         message,
         data
       })
};

export const sendError = (res, message, errors = null, statusCode = 500) => {
       res.status(statusCode).json({
        success:false,
        status_code: statusCode,
        message,
        errors
       })
};