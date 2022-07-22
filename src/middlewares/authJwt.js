import jwt from 'jsonwebtoken'
import config from '../config'
import user from '../models/user'

export const verifyToken = async (req, res, next) => {    
    try {
        const token = req.headers["x-access-token"];
        if (!token) {
            return res.status(403).json({message: "No Token previded"});
        }
        const decoded = jwt.verify(token, config.secret);
        const User = await user.findById(decoded.id);
        if(!User){
            return res.status(403).json({message: "User no found"});
        }
        next();
    } catch (error) {
        console.log(error);     
        return res.status(404).json({message: "unauthorized"});   
    }
    
    
}