import axiosClient from './axiosClient';
export default {
  list: (p) => axiosClient.get('/feedback', { params: p }),
  create: (d) => axiosClient.post('/feedback', d)
};
