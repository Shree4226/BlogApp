import { User } from "../models/user.model.js";

// Replaces: createAccount
const registerUser = async (req, res) => {
    const { email, password, name } = req.body;
    
    // Check if user exists
    const existedUser = await User.findOne({ email });
    if (existedUser) return res.status(409).json({ message: "User already exists" });

    // Create user
    const user = await User.create({ name, email, password });
    
    // Auto-login logic (Generate token)
    const token = user.generateAccessToken();

    return res
    .status(201)
    .cookie("accessToken", token, { httpOnly: true }) // Set secure cookie
    .json({ user, token });
};

// Replaces: login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = user.generateAccessToken();

    return res
    .status(200)
    .cookie("accessToken", token, { httpOnly: true })
    .json({ user, token });
};

// Replaces: logout
const logoutUser = async (req, res) => {
    return res
    .status(200)
    .clearCookie("accessToken")
    .json({ message: "Logged Out Successfully" });
};

// Replaces: getCurrentUser
const getCurrentUser = async (req, res) => {
    return res.status(200).json(req.user);
};

export { registerUser, loginUser, logoutUser, getCurrentUser };
