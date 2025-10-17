import { api } from "./client";

export interface AuthLoginPayload {
  email: string;
  password: string;
}

export interface AuthRegisterPayload {
  email: string;
  password: string;
  username: string;
  name: string;
  bio?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  avatar?: string;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
}

export interface FeedbackItem {
  id: string;
  content: string;
  createdAt: string;
  isPublic: boolean;
}

export const authAPI = {
  login: (data: AuthLoginPayload) => api.post("/auth/login", data),
  register: (data: AuthRegisterPayload) => api.post("/users", data),
};

export const userAPI = {
  getProfile: () => api.get<UserProfile>("/users/me"),
  updateProfile: (
    data: Partial<Omit<UserProfile, "id" | "email" | "username">>
  ) => api.patch("/users/me", data),
  getPublicProfile: (username: string) =>
    api.get<UserProfile>(`/users/profile/${username}`),
};

export const linksAPI = {
  getMyLinks: () => api.get<LinkItem[]>("/links"),
  createLink: (data: Pick<LinkItem, "title" | "url">) =>
    api.post("/links", data),
  updateLink: (id: string, data: Pick<LinkItem, "title" | "url">) =>
    api.patch(`/links/${id}`, data),
  deleteLink: (id: string) => api.delete(`/links/${id}`),
  reorderLinks: (linkIds: string[]) => api.put("/links/reorder", { linkIds }),
  getPublicLinks: (username: string) =>
    api.get<LinkItem[]>(`/links/public/${username}`),
};

export const feedbackAPI = {
  getMyFeedbacks: (page: number = 1, limit: number = 10) =>
    api.get<{
      data: FeedbackItem[];
      page?: number;
      limit?: number;
      total?: number;
    }>(`/feedback?page=${page}&limit=${limit}`),
  createFeedback: (
    username: string,
    data: { content: string; isPublic: boolean }
  ) => api.post(`/feedback/${username}`, data),
  updateFeedback: (
    id: string,
    data: Partial<Pick<FeedbackItem, "content" | "isPublic">>
  ) => api.patch(`/feedback/${id}`, data),
  deleteFeedback: (id: string) => api.delete(`/feedback/${id}`),
  getStats: () => api.get("/feedback/stats"),
  getPublicFeedbacks: (
    username: string,
    page: number = 1,
    limit: number = 10
  ) =>
    api.get<{
      data: FeedbackItem[];
      page?: number;
      limit?: number;
      total?: number;
    }>(`/feedback/public/${username}?page=${page}&limit=${limit}`),
};
