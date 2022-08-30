import React from 'react';
import axios from 'axios';

const SERVER_URL = 'http://13.209.204.114:8080/api';

const client = axios.create({
  // baseURL: `${SERVER_URL}`,
});

export default client;
