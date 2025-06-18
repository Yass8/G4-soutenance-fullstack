import express from 'express';


const usrerRoutes = express.Router();

usrerRoutes.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the user route"
    });
});

export default usrerRoutes;
