const supabase = require('../db/supabaseClient');
const { v4: uuidv4 } = require('uuid');

const mockFlights = [
  { origin: "NYC", destination: "LON", date: "2024-07-01", airline: "Delta", time: "08:00", price: 350, duration: "7h" },
  { origin: "NYC", destination: "LON", date: "2024-07-01", airline: "United", time: "09:30", price: 370, duration: "7.5h" },
  { origin: "NYC", destination: "PAR", date: "2024-07-01", airline: "Air France", time: "10:00", price: 400, duration: "8h" },
  { origin: "LAX", destination: "TYO", date: "2024-07-01", airline: "ANA", time: "12:00", price: 800, duration: "12h" },
  { origin: "LAX", destination: "SYD", date: "2024-07-02", airline: "Qantas", time: "22:00", price: 950, duration: "15h" },
  { origin: "LON", destination: "NYC", date: "2024-07-03", airline: "British Airways", time: "14:00", price: 360, duration: "7.5h" },
  { origin: "PAR", destination: "NYC", date: "2024-07-03", airline: "Delta", time: "16:00", price: 410, duration: "8h" },
  { origin: "TYO", destination: "LAX", date: "2024-07-04", airline: "ANA", time: "18:00", price: 820, duration: "11.5h" },
  { origin: "SYD", destination: "LAX", date: "2024-07-05", airline: "Qantas", time: "20:00", price: 970, duration: "14.5h" },
  { origin: "NYC", destination: "BER", date: "2024-07-06", airline: "Lufthansa", time: "07:00", price: 420, duration: "9h" }
];

(async () => {
  for (const flight of mockFlights) {
    await supabase.from('flights').insert([{
      id: uuidv4(),
      ...flight
    }]);
  }
  console.log('Mock flights loaded.');
  process.exit();
})();
