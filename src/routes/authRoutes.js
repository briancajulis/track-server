const express = require('express');

const router = express.Router();

// Route Paths (use postman for testing)
router.post('/signup', (req, res) => {
    console.log(req.body);
    res.send('You made a post request');
});

module.exports = router;