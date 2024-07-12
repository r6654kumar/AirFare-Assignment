import express from 'express';
import axios from 'axios';
import cors from 'cors';
const app = express();
const port = 5000;
app.use(cors({ credentials: true, origin:true }));
app.use(express.json());
//@Rahul 
app.post('/search', async (req, res) => {
  const { origin, destination, cabin } = req.body;
    const headers = {
    accept: 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9,hi;q=0.8',
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  };

  const json_data = {
    origin,
    destination,
    partnerPrograms: [
      'Air Canada',
      'United Airlines',
      'KLM',
      'Qantas',
      'American Airlines',
      'Etihad Airways',
      'Alaska Airlines',
      'Qatar Airways',
      'LifeMiles',
    ],
    stops: 2,
    departureTimeFrom: '2024-07-09T00:00:00Z',
    departureTimeTo: '2024-10-07T00:00:00Z',
    isOldData: false,
    limit: 302,
    offset: 0,
    cabinSelection: [cabin],
    date: '2024-07-09T12:00:17.796Z',
  };

  try {
    const response = await axios.post('https://cardgpt.in/apitest', json_data, { headers });
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
