require('./models/User');
require('./models/Track');
const express = require ('express');
const mongoose = require ('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser'); // handles json information
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

dotenv.config();

const app = express();

app.use(bodyParser.json()) // must be above authRoutes
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err)
});

// Test Route
app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
})