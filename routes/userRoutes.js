const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Subscriber = require("../models/subscriber");
const Contact = require("../models/contact");

// ===============================
// CONTACT / FEEDBACK SUBMISSION
// ===============================
router.post("/contact", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        await newContact.save();

        console.log("📬 NEW CONTACT MESSAGE SAVED");
        console.log("👤 From:", newContact.name, `(${newContact.email})`);
        console.log("📝 Subject:", newContact.subject);

        res.status(201).json({
            message: "Thank you! Your message has been sent successfully."
        });
    } catch (err) {
        console.error("Contact Form Error:", err);
        res.status(500).json({
            message: "Server error. Please try again later."
        });
    }
});
module.exports = router;

// ===============================
// REGISTER USER
// ===============================
router.post("/register", async (req, res) => {
    try {
        console.log("Body received:", req.body);

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        console.log("User saved:", user);

        res.status(201).json({
            message: "User Registered Successfully"
        });

    } catch (err) {
        console.error("Registration Error:", err);

        res.status(500).json({
            message: "Server Error"
        });
    }
});


// ===============================
// LOGIN USER
// ===============================
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = user.password === password;

        if (!isMatch) {
            return res.status(401).json({
                message: "Wrong password"
            });
        }

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error("Login Error:", err);

        res.status(500).json({
            message: "Server Error"
        });
    }
});


// ===============================
// SUBSCRIBE
// ===============================
router.post("/subscribe", async (req, res) => {

    console.log("🔥 SUBSCRIBE ROUTE HIT");
    console.log("📦 Body:", req.body);
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        // Check if already subscribed
        const existingSubscriber = await Subscriber.findOne({ email });

        if (existingSubscriber) {
            return res.status(400).json({
                message: "Email is already subscribed"
            });
        }

        // Create subscriber
        const subscriber = new Subscriber({
            email
        });

        await subscriber.save();

        console.log("✅ SUBSCRIBER SAVED SUCCESSFULLY");
        console.log("📧 Email:", subscriber.email);
        console.log("🆔 ID:", subscriber._id);

        res.status(201).json({
            message: "Subscribed successfully"
        });

    } catch (err) {
        console.error("Subscription Error:", err);

        res.status(500).json({
            message: "Server Error"
        });
    }
});


module.exports = router;