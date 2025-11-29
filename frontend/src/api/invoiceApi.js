import axiosClient from './axiosClient';
export default {
  list: (p) => axiosClient.get('/invoices', { params: p }),
  get: (id) => axiosClient.get(`/invoices/${id}`),
  create: (d) => axiosClient.post('/invoices', d)
};
