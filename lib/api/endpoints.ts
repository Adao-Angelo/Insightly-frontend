import { api } from "./client";

export const authAPI = {
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),
  register: (data: {
    email: string;
    password: string;
    username: string;
    name: string;
    bio?: string;
  }) => api.post("/users", data),
};

export const userAPI = {
  getProfile: () => api.get("/users/me"),
  updateProfile: (data: any) => api.patch("/users/me", data),
  getPublicProfile: (username: string) => api.get(`/users/profile/${username}`),
};

export const linksAPI = {
  getMyLinks: () => api.get("/links"),
  createLink: (data: any) => api.post("/links", data),
  updateLink: (id: string, data: any) => api.patch(`/links/${id}`, data),
  deleteLink: (id: string) => api.delete(`/links/${id}`),
  reorderLinks: (linkIds: string[]) => api.put("/links/reorder", { linkIds }),
  getPublicLinks: (username: string) => api.get(`/links/public/${username}`),
};

export const feedbackAPI = {
  getMyFeedbacks: (page: number = 1, limit: number = 10) =>
    api.get(`/feedback?page=${page}&limit=${limit}`),
  createFeedback: (username: string, data: any) =>
    api.post(`/feedback/${username}`, data),
  updateFeedback: (id: string, data: any) => api.patch(`/feedback/${id}`, data),
  deleteFeedback: (id: string) => api.delete(`/feedback/${id}`),
  getStats: () => api.get("/feedback/stats"),
  getPublicFeedbacks: (
    username: string,
    page: number = 1,
    limit: number = 10
  ) => api.get(`/feedback/public/${username}?page=${page}&limit=${limit}`),
};
