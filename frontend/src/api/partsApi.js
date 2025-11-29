import axiosClient from './axiosClient';

// Backend controller maps spare parts under /api/parts
export default {
  list: (p) => axiosClient.get('/parts', { params: p }),
  get: (id) => axiosClient.get(`/parts/${id}`),
  create: (d) => axiosClient.post('/parts', d),
  update: (id, d) => axiosClient.put(`/parts/${id}`, d),
  remove: (id) => axiosClient.delete(`/parts/${id}`),
};
