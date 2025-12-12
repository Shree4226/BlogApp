import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password
}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare password
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

// Method to generate Access Token (JWT)
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        { _id: this._id, email: this.email, name: this.name },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
    );
}

export const User = mongoose.model("User", userSchema);
