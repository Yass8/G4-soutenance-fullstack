import dotenv from 'dotenv';
dotenv.config();



import express from 'express';
// const fileUpload = require('express-fileupload');
// app.use(fileUpload());

const app = express();
app.use(express.json());

// import routes
import userRoutes from './routes/user.routes.js';

app.use('/users', userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
