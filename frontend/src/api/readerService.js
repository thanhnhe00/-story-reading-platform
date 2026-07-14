import api from './axios';

const readerService = {
  // Read chapter
  readChapter: async (chapterId) => {
    const response = await api.get(`/chapters/${chapterId}/read`);
    return response.data;
  },

  // Follow story
  followStory: async (storyId) => {
    const response = await api.post(`/stories/${storyId}/follow`);
    return response.data;
  },

  // Unfollow story
  unfollowStory: async (storyId) => {
    const response = await api.delete(`/stories/${storyId}/follow`);
    return response.data;
  },

  // Post comment
  postComment: async (chapterId, data) => {
    const response = await api.post(`/chapters/${chapterId}/comments`, data);
    return response.data;
  },

  // Get comments
  getComments: async (chapterId, page = 0, size = 10) => {
    const response = await api.get(`/chapters/${chapterId}/comments`, {
      params: { page, size },
    });
    return response.data;
  },

  // Update comment
  updateComment: async (commentId, data) => {
    const response = await api.put(`/comments/${commentId}`, data);
    return response.data;
  },

  // Delete comment
  deleteComment: async (commentId) => {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
  },
};

export default readerService;
