import axiosClient from './axiosClient';

// ServiceRecord endpoints: backend exposes /api/records
export default {
  list: (p) => axiosClient.get('/records', { params: p }),
  get: (id) => axiosClient.get(`/records/${id}`),

  // create expects ServiceRecord body and required query param vehicleId
  create: (data) => {
    const { vehicleId, requestId, mechanicId, serviceDate, description, totalCost } = data;
    const body = { serviceDate, description, totalCost };
    const params = { vehicleId };
    if (requestId) params.requestId = requestId;
    if (mechanicId) params.mechanicId = mechanicId;
    return axiosClient.post('/records', body, { params });
  },

  update: (id, data) => {
    // backend update expects a ServiceRecord body and optional linking via params
    const { vehicleId, requestId, mechanicId, serviceDate, description, totalCost } = data;
    const body = { serviceDate, description, totalCost };
    const params = {};
    if (vehicleId) params.vehicleId = vehicleId;
    if (requestId) params.requestId = requestId;
    if (mechanicId) params.mechanicId = mechanicId;
    return axiosClient.put(`/records/${id}`, body, { params });
  },

  delete: (id) => axiosClient.delete(`/records/${id}`),
};
