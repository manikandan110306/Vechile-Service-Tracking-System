import axiosClient from './axiosClient';
export default {
  list: (p) => axiosClient.get('/notifications', { params: p }),
  markRead: (id) => axiosClient.put(`/notifications/${id}/read`)
};
