//routes/protectedRoutes.js

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { getUserBalance, getUsersUnderUser } = require('../models/dbOperations');

// GET RESPONSE ON ACCESSING PROTECTED ROUTES
router.get('/', verifyToken, (req, res) => {
    // This route is protected and accessed with a valid token
    res.json({ message: 'Protected route accessed successfully', userId: req.userId });
});

// GET SIGNED IN USER'S BALANCE
router.get('/balance', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const balance = await getUserBalance(userId); // Get the user's balance
        res.json({ message: 'Protected route accessed successfully', userId, balance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET USERS UNDER THE SIGNED IN USER BY USING USERTYPE
router.get('/underme/:utype', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const { utype } = req.params;
        const user = await getUsersUnderUser(userId, utype);
        res.json({ message: 'Protected route accessed successfully', userId, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
