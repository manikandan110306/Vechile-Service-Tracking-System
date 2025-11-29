import axiosClient from './axiosClient';
export default {
  list: (p) => axiosClient.get('/mechanics', { params: p }),
  get: (id) => axiosClient.get(`/mechanics/${id}`),
  create: (d) => axiosClient.post('/mechanics', d),
  update: (id,d) => axiosClient.put(`/mechanics/${id}`, d),
  remove: (id) => axiosClient.delete(`/mechanics/${id}`)
};
