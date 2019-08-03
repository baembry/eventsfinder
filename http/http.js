const axios = require('axios');

const devUrl = 'http://localhost:3000';

const http = {
  async getEvents(keyword, page) {
    console.log('getting', keyword);
    const res = await axios.get(
      `${devUrl}/events?q=${keyword}&_page=${page}&limit=10`
    );
    console.log(res.data);
    return res.data;
  },
};
export default http;
