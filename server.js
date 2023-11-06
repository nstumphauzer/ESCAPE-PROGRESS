const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/api/issues', async (req, res) => {
  const youtrackUrl = `https://retvrn.youtrack.cloud/api/issues/`; // Replace <your_youtrack_instance> with your actual YouTrack instance URL

  const options = {
    headers: {
      'Authorization': `Bearer ${process.env.YOUTRACK_API_TOKEN}`
    },
    params: {
      // Your query parameters
    }
  };

  console.log('Making request to YouTrack API...');
  console.log(`URL: ${youtrackUrl}`);
  console.log(`Options: ${JSON.stringify(options, null, 2)}`);

  try {
    const youtrackResponse = await axios.get(youtrackUrl, options);
    console.log('YouTrack response status:', youtrackResponse.status);
    console.log('YouTrack response data:', youtrackResponse.data);
    res.json(youtrackResponse.data);
  } catch (error) {
    console.error('Error making API call to YouTrack:', error.message);
    handleAxiosError(error);
    res.status(500).json({ message: "Error fetching data from YouTrack" });
  }
});

function handleAxiosError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Error response status:', error.response.status);
    console.error('Error response data:', error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error setting up request:', error.message);
  }
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
