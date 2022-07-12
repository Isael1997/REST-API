import user from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config";
import role from "../models/roles";

export const SignIn = async (req, res) => {
    const { username, email, password, roles } = req.body;
    res.json("Sign In");
};

export const SignUp = async (req, res) => {
    const { username, email, password, roles } = req.body;

    const newUser = new user({
        username,
        email,
        password: await user.encryptPassword(password),
    });

    if(roles){
        const foundRole = await role.find({name: {$in: roles}});
        newUser.roles = foundRole.map((role) => role._id);
    }else{
        const rol = await role.findOne({ name: "user"});
        newUser.roles = [rol._id];
    }
    //saving of data
    const savedUser = await newUser.save();
    console.log(savedUser);

    //creating of token
    const token = jwt.sign(
        { id: savedUser._id /* Busca el ID*/ },
        config.secret /*THe Word Secret */,
        { expiresIn: 86400 /*The time is 24 hours*/ }
    );
    res.status(200).json({token: token});
};
