import { model, Schema } from "mongoose";

const userSchema = new Schema ({
    
},
{
    timestamps: true
})

const userModel = model.User || model('User', userSchema)

export default userModel;