const supabase = require('../db/supabaseClient');

exports.searchFlights = async (req, res) => {
  try {
    const { origin, destination, date } = req.query;
    if (!origin || !destination || !date) {
      return res.status(400).json({ error: 'origin, destination, and date are required' });
    }
    const { data, error } = await supabase
      .from('flights')
      .select('*')
      .eq('origin', origin)
      .eq('destination', destination)
      .eq('date', date);

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('searchFlights:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getFlightById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('flights')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return res.status(404).json({ error: 'Flight not found' });
    res.json(data);
  } catch (err) {
    console.error('getFlightById:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
