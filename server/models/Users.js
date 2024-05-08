import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String , unique: true },
    email: { type: String },
    password: { type: String },
    roles: { type: String }
})

const userModel = mongoose.model("users", UsersSchema)

export default userModel