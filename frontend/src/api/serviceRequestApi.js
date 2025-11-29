import axios from 'axios';
const BASE = "http://localhost:8080/api/requests";

export default {
  list: () => axios.get(BASE).then(r => r.data),
  get: (id) => axios.get(`${BASE}/${id}`).then(r => r.data),
  create: (data) => axios.post(BASE, data).then(r => r.data),
  update: (id, data) => axios.put(`${BASE}/${id}`, data).then(r => r.data),
  delete: (id) => axios.delete(`${BASE}/${id}`)
};
