import axiosClient from './axiosClient';
export default {
  list: (p) => axiosClient.get('/service-part-usage', { params: p }),
  create: (d) => axiosClient.post('/service-part-usage', d)
};
