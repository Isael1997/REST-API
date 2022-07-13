import user from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config";
import role from "../models/roles";

export const SignIn = async (req, res) => {
    try {
        const { username, email, password, roles } = req.body;
        const userFound = await user.findOne({ email: req.body.email });
        const matchpassword = await user.comparePassword(req.body.password, userFound);

        if (!userFound) {
            return res.status(400).json({ message: "User not Found" });
        }else if (userFound == true){
            if(!matchpassword){
                return res.status(401).json({
                    token: null,
                    message: "Invalid Password"
                });
            }else{
                const token = jwt.sign({ id: userFound._id }, config.secret, { expiresIn: 86400 });
                res.status().json({ token });
            }
        }         
    } catch (error) {
        console.log(error);
    }
};

export const SignUp = async (req, res) => {
    const { username, email, password, roles } = req.body;

    const newUser = new user({
        username,
        email,
        password: await user.encryptPassword(password),
    });

    if (roles) {
        const foundRole = await role.find({ name: { $in: roles/*This is for re.body.roles */ } });
        newUser.roles = foundRole.map((role) => role._id);
    } else {
        const rol/*This is for save of data of the db */ = await role.findOne({ name: "user" });
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
    res.status(200).json({ token: token });
};
