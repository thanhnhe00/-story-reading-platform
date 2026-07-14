import api from './axios';

const storyService = {
  // Get story details
  getStoryDetail: async (id) => {
    const response = await api.get(`/stories/${id}`);
    return response.data;
  },

  // Get latest stories
  getLatestStories: async (limit = 10) => {
    const response = await api.get('/stories/latest', { params: { limit } });
    return response.data;
  },

  // Search stories
  searchStories: async (params) => {
    const response = await api.get('/stories/search', { params });
    return response.data;
  },

  // Get stories by category
  getByCategory: async (categoryId, page = 0, size = 10) => {
    const response = await api.get('/stories/by-category', {
      params: { categoryId, page, size },
    });
    return response.data;
  },

  // Get stories by author
  getByAuthor: async (author) => {
    const response = await api.get('/stories/by-author', { params: { author } });
    return response.data;
  },

  // Get chapters of a story
  getChapters: async (storyId) => {
    const response = await api.get(`/stories/${storyId}/chapters`);
    return response.data;
  },

  // Create story (creator only)
  createStory: async (data) => {
    const response = await api.post('/stories', data);
    return response.data;
  },

  // Update story
  updateStory: async (id, data) => {
    const response = await api.put(`/stories/${id}`, data);
    return response.data;
  },

  // Delete story
  deleteStory: async (id) => {
    const response = await api.delete(`/stories/${id}`);
    return response.data;
  },

  // Get my stories
  getMyStories: async () => {
    const response = await api.get('/stories/my');
    return response.data;
  },
};

export default storyService;
