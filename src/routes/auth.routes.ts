import { Router } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

router.post("/google", async (req, res) => {
    try {
        const { accessToken } = req.body;

        if (!accessToken) {
            return res.status(400).json({ message: "Access token required" });
        }

        const response = await axios.get(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
        );

        const { sub: googleId, email, name, picture } = response.data;

        let user = await User.findOne({ where: { googleId } });
        if (!user) {
            user = await User.create({ googleId, email, name, picture });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token, user });
    } catch (error: any) {
        console.error("Auth error:", error.message);
        res.status(401).json({ message: "Invalid Google token" });
    }
});

export default router;
