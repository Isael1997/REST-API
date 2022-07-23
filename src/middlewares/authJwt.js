import jwt from 'jsonwebtoken'
import config from '../config'
import user from '../models/user'
import Role from '../models/roles'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) {
            return res.status(403).json({ message: "No Token previded" });
        }
        const decoded = jwt.verify(token, config.secret);
        req.userId = decoded.id;

        const User = await user.findById(req.userId);
        if (!User) {
            return res.status(403).json({ message: "User no found" });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Unauthorized" });
    }
}

export const isModerate = async (req, res, next) => {

    try {
        const User = await user.findById(req.userId);
        const roles = await Role.find({ _id: { $in: User.roles } });
    
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderate") {
                next();
                return;
            }
        }
        return res.status(403).json({ message: "Require Moderator Role!" });
    } catch (error) {
        console.log(error);
        
    }
}

export const isAdmin = async (req, res, next) => {

}