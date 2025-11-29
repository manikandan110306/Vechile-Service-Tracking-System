import axiosClient from './axiosClient';
export default {
  list: (p) => axiosClient.get('/service-records', { params: p }),
  get: (id) => axiosClient.get(`/service-records/${id}`),
  create: (d) => axiosClient.post('/service-records', d),
  update: (id,d) => axiosClient.put(`/service-records/${id}`, d),
  remove: (id) => axiosClient.delete(`/service-records/${id}`)
};
