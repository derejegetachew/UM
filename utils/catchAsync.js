const catchasyncHandler = fn => 
    {return (req, res, next) =>
         Promise.resolve(fn(req, res, next)).catch(next);
    
    }
    module.exports=catchasyncHandler;navigato