require('dotenv').config();
const express = require('express');
const cors = require('cors');

const flightsRoutes = require('./routes/flights');
const bookingsRoutes = require('./routes/bookings');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/flights', flightsRoutes);
app.use('/bookings', bookingsRoutes);

app.get('/', (req, res) => res.send('Flight Booking API'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
