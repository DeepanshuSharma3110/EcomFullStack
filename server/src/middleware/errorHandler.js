// error = {code:"", message:"",}

const errorHandler = (err,req, res, next)=>{
    const statusCode = err.statusCode || 500;
    (err);
   return res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
      });
}

export default errorHandler;