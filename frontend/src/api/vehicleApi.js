import axiosClient from './axiosClient';
export default {
  list: (p) => axiosClient.get('/vehicles', { params: p }),
  get: (id) => axiosClient.get(`/vehicles/${id}`),
  create: (d) => axiosClient.post('/vehicles', d),
  update: (id,d) => axiosClient.put(`/vehicles/${id}`, d),
  remove: (id) => axiosClient.delete(`/vehicles/${id}`)
};
