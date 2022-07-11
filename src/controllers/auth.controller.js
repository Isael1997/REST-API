import user from '../models/user'


export const SignIn = async (req, res) => {
    const {username, email, password, role} = req.body;
    res.json('Sign In');
}

export const SignUp = async (req, res) => {
    const {username, email, password, role} = req.body;

    const newUser = new user({
        username,
        email,
        password: user.encryptPassword(password),
        role
    });

    console.log(newUser);

    res.json('Sign Up')
}