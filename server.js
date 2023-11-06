const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/api/issues', (req, res) => {
  const youtrackUrl = 'https://retvrn.youtrack.cloud/api/admin/customFieldSettings/customFields?fields=id,name,fieldType(presentation,id)&$top=3';
  const options = {
    headers: {
      'Authorization': 'Bearer perm:bmljay5zdHVtcGhhdXplcg==.NTQtMA==.gkEz7CK7w9WAJy1OeiwuMzuntrbIkj', // Make sure to replace 'your_token' with your actual token
      'Accept': 'application/json',
      // Add other headers if needed
    },
  };

  console.log('Making request to YouTrack API...');
  console.log(`URL: ${youtrackUrl}`);
  console.log(`Options: ${JSON.stringify(options, null, 2)}`);

  axios.get(youtrackUrl, options)
    .then(youtrackResponse => {
      console.log('YouTrack response status:', youtrackResponse.status);
      console.log('YouTrack response data:', youtrackResponse.data);
      res.json(youtrackResponse.data);
    })
    .catch(error => {
      console.error('Error making API call to YouTrack:', error.message);
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
      res.status(500).json({ message: "Error fetching data from YouTrack" });
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
