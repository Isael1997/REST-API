import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
    
},
{
    timestamps: true,
    versionKey: false
});

userSchema.statics.encryptPassword = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const p = await bcrypt.hash(password, salt);
    console.log(p);
    return p
}

userSchema.statics.comparePassword = async(password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}

export default model("User", userSchema);