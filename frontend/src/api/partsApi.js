import axiosClient from './axiosClient';
export default {
  list: (p) => axiosClient.get('/spareparts', { params: p }),
  get: (id) => axiosClient.get(`/spareparts/${id}`),
  create: (d) => axiosClient.post('/spareparts', d),
  update: (id,d) => axiosClient.put(`/spareparts/${id}`, d),
  remove: (id) => axiosClient.delete(`/spareparts/${id}`)
};
