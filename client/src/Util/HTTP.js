import axios from 'axios';

// Helper function that fixes docker CORS error for HTTP requests
const httpRequest = axios.create({
  baseURL: 'http://localhost:3001/',
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

export default httpRequest;
