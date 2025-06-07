const User = require('../models/user');

// Sign up a new user
exports.signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = await User.create({ username, password });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
};

// Log in an existing user
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user || !(await user.validatePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};