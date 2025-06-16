const supabase = require('../db/supabaseClient');
const { v4: uuidv4 } = require('uuid');

exports.createBooking = async (req, res) => {
  try {
    const { flight_id, passenger } = req.body;
    if (!flight_id || !passenger || !passenger.name || !passenger.age || !passenger.passport) {
      return res.status(400).json({ error: 'flight_id and complete passenger info required' });
    }

    // Check if flight exists
    const { data: flight, error: flightError } = await supabase
      .from('flights')
      .select('*')
      .eq('id', flight_id)
      .single();
    if (flightError || !flight) return res.status(404).json({ error: 'Flight not found' });

    // Create user (if not exists)
    let user_id = uuidv4();
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert([{ id: user_id, name: passenger.name, age: passenger.age, passport: passenger.passport }])
      .select()
      .single();

    if (userError && !userError.message.includes('duplicate key')) throw userError;
    if (user) user_id = user.id;

    // Create booking
    const booking_ref = Math.random().toString(36).substring(2, 10).toUpperCase();
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert([{
        id: uuidv4(),
        booking_ref,
        flight_id,
        user_id,
        passenger_name: passenger.name,
        passenger_age: passenger.age,
        passenger_passport: passenger.passport
      }])
      .select()
      .single();

    if (bookingError) throw bookingError;

    res.status(201).json({ booking_ref, booking });
  } catch (err) {
    console.error('createBooking:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data: booking, error } = await supabase
      .from('bookings')
      .select('*, flights(*), users(*)')
      .eq('id', id)
      .single();

    if (error || !booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    console.error('getBookingById:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
