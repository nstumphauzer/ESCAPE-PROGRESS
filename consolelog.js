const axios = require('axios');

async function fetchYouTrackIssues() {
  const url = 'http://your-youtrack-instance.com/api/issues';
  const options = {
    headers: {
      'Authorization': 'Bearer your_token',
      'Accept': 'application/json',
      // other headers...
    }
  };

  console.log(`Requesting: ${url}`);
  console.log(`With headers: ${JSON.stringify(options.headers, null, 2)}`);

  try {
    const response = await axios.get(url, options);
    console.log('Response Status:', response.status);
    console.log('Response Body:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error Status:', error.response?.status);
    console.error('Error Body:', error.response?.data);
    // Handle error appropriately
  }
}

fetchYouTrackIssues();
