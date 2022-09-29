const jwt = require('jsonwebtoken');

// module.exports = function  (req,res,next){
//     //Check if token exist in header or not
//     const token = req.header('auth-token');
//     if(!token) return res.status(401).send("Access Denied !!!!!!!!");

//     try{
//         const verified = jwt.verify(token, process.env.TOKEN_SEC);
//         req.user = verified;
//         next();
//     }catch(err){
//         res.status(400).send("invalid token");
//     }
// }

const verifyToken = (req,res,next) =>{
    //     //Check if token exist in header or not
    const token = req.header('auth-token');
    if(!token) return res.status(401).send("Access Denied !!!!!!!!");

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SEC);
        req.user = verified;
        req.token = token;
        next();
    }catch(err){
        res.status(400).send("invalid token");
    }
}

const verifyTokenAndAdmin = (req,res,next) =>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(400).send("You are not admin");
        }
    });
}


module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    
};