const jwt = require('jsonwebtoken');
const index = require("../config/index");

module.exports = function(req,res,next){
    console.log(req.path);
    if(req.path != '/users/login' && req.path != "/users/create"){
        if(req.headers.authorization){
            let token = req.headers.authorization.split(' ')[1];
            jwt.verify(token,index.bcrypt.key,function(error,decoded){
                console.log(decoded);
                if(error) return res.status(200).json({message: 'No tienes los permisos suficientes para estar aquí...',error});
                next();
                /*if(req.method != 'GET'){
                    if(decoded.role == 'admin') next();
                    else res.status(403).send({message: 'No tienes los permisos suficientes para estar aquí...'});
                }else{
                    
                }*/
            });
        }else res.status(403).send({message: 'No tienes los permisos suficientes para estar aquí...'});
    }else next();
}