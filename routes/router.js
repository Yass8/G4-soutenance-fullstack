import express from "express";

const router = express.Router();

const userRoutes = require("./user.routes");



router.use("/users", userRoutes);
// router.use("/boats", boatRoutes);
// router.use('/reservations', reservationRoutes);
// router.use('/contrats', contratRoutes);

module.exports = router;
