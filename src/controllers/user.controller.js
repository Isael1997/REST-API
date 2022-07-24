import User from "../models/user";
import Role from "../models/roles"

export const createUser = async (req, res) => {
    try {
        const { username, email, password, roles } = req.body;

        const rolesFound = await Role.find({ name: { $in: roles } });

        // creating a new User
        const user = new User({
            username,
            email,
            password,
            roles: rolesFound.map((role) => role._id),
        });

        // encrypting password
        user.password = await User.encryptPassword(user.password);

        if (roles) {
            const foundRole = await Role.find({ name: { $in: roles/*This is for re.body.roles */ } });
            user.roles = foundRole.map((Role) => Role._id);
        } else {
            const rol = await Role.findOne({ name: "user" });
            user.roles = [rol._id];
        }
        // saving the new user
        const savedUser = await user.save();

        return res.status(200).json({
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            roles: savedUser.roles,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({Message: error});
    }
};