import axios from 'axios';

const BASE = "http://localhost:8080/api/requests";

// Utility to clean request data
function cleanRequestData(data) {
  return {
    userId: data.userId ?? data.user?.userId,
    vehicleId: data.vehicleId ?? data.vehicle?.vehicleId,
    serviceType: data.serviceType,
    preferredDate: data.preferredDate,
    status: data.status,
    notes: data.notes
  };
}

export default {
  list: () => axios.get(BASE).then(r => r.data),

  get: (id) => axios.get(`${BASE}/${id}`).then(r => r.data),

  create: (data) =>
    axios.post(BASE, cleanRequestData(data)).then(r => r.data),

  update: (id, data) =>
    axios.put(`${BASE}/${id}`, cleanRequestData(data)).then(r => r.data),

  delete: (id) => axios.delete(`${BASE}/${id}`),
};
