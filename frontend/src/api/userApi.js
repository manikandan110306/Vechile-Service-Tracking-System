import axiosClient from './axiosClient';
const userApi = {
    list: (p) => axiosClient.get('/users', { params: p }),
  get: (id) => axiosClient.get(`/users/${id}`),
  create: (d) => axiosClient.post('/users', d),
  update: (id,d) => axiosClient.put(`/users/${id}`, d),
  remove: (id) => axiosClient.delete(`/users/${id}`)
};
export default userApi;

// export default {
//   list: (p) => axiosClient.get('/users', { params: p }),
//   get: (id) => axiosClient.get(`/users/${id}`),
//   create: (d) => axiosClient.post('/users', d),
//   update: (id,d) => axiosClient.put(`/users/${id}`, d),
//   remove: (id) => axiosClient.delete(`/users/${id}`)
// };
