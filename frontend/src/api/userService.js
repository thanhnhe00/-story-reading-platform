import api from './axios';

const userService = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (data) => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },

  // Get reading history
  getReadingHistory: async (page = 0, size = 10) => {
    const response = await api.get('/users/history', { params: { page, size } });
    return response.data;
  },

  // Get following
  getFollowing: async (page = 0, size = 10) => {
    const response = await api.get('/users/following', { params: { page, size } });
    return response.data;
  },

  // Get notifications
  getNotifications: async () => {
    const response = await api.get('/notifications');
    return response.data;
  },
};

export default userService;
