import express from 'express';
import bcrypt from 'bcrypt';
import User  from '../models/user.js';

const usrerRoutes = express.Router();

usrerRoutes.get("/", (req, res) => {
    try {
        const users = User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


usrerRoutes.post('/', async (req, res) => {
    try {
        const { firstname, lastname, email, password, role } = req.body;
        // Validate required fields
        if (!firstname || !lastname || !email || !password || !role) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        // Create a new user
        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password: await bcrypt.hash(password, 10),
            role
        });
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser.id,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });   

    }
});
export default usrerRoutes;
