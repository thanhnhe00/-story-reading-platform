import api from './axios';

const categoryService = {
  // Get all categories
  getAllCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get category by id
  getCategoryById: async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },
};

export default categoryService;
