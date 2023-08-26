const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    console.log("in vt");
    const extractToken = req.cookies.login;
    console.log("extracted token", extractToken);
    let id;

    jwt.verify(extractToken,""+ process.env.secretKey, (error,decrypted)=>{
        if(error){
            console.log(error+" in verifyToken");
            return res.status(400).json({success:false, message: "authorization failed"})
        }

        req.access_id = decrypted.id;
        console.log(req.access_id);
        next();
    })
}

module.exports ={verifyToken};