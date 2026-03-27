import axios from 'axios';
import { 
  ApiResponse, IUser, ISubscription, IScore, 
  IDraw, ICharity, IWinner, IDonation 
} from '../types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL || '/api',
});

// Request interceptor: attach Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register: (data: any) => api.post<ApiResponse<{user: IUser, token: string}>>('/auth/register', data),
  login: (data: any) => api.post<ApiResponse<{user: IUser, token: string}>>('/auth/login', data),
  forgotPassword: (email: string) => api.post<ApiResponse<any>>('/auth/forgot-password', { email }),
  resetPassword: (data: any) => api.post<ApiResponse<any>>('/auth/reset-password', data),
  getMe: () => api.get<ApiResponse<IUser>>('/auth/me'),
};

export const subscriptionApi = {
  create: (plan: string) => api.post<ApiResponse<any>>('/subscriptions', { plan }),
  verifyPayment: (data: any) => api.post<ApiResponse<any>>('/subscriptions/verify', data),
  cancel: () => api.post<ApiResponse<any>>('/subscriptions/cancel'),
  getStatus: () => api.get<ApiResponse<ISubscription>>('/subscriptions/status'),
};

export const scoreApi = {
  getAll: () => api.get<ApiResponse<IScore[]>>('/scores'),
  add: (score: number, date: string) => api.post<ApiResponse<IScore>>('/scores', { score, date }),
  update: (id: string, score: number, date: string) => api.put<ApiResponse<IScore>>(`/scores/${id}`, { score, date }),
  delete: (id: string) => api.delete<ApiResponse<any>>(`/scores/${id}`),
  adminGetUserScores: (userId: string) => api.get<ApiResponse<IScore[]>>(`/admin/users/${userId}/scores`),
  adminUpdateScore: (userId: string, scoreId: string, data: any) => 
    api.put<ApiResponse<IScore>>(`/admin/users/${userId}/scores/${scoreId}`, data),
};

export const drawApi = {
  getCurrent: () => api.get<ApiResponse<IDraw>>('/draws/current'),
  getHistory: () => api.get<ApiResponse<any[]>>('/draws/history'),
  getResults: (month: string) => api.get<ApiResponse<any>>(`/draws/results/${month}`),
  adminCreate: (data: any) => api.post<ApiResponse<IDraw>>('/admin/draws', data),
  adminSimulate: (id: string) => api.post<ApiResponse<any>>(`/admin/draws/${id}/simulate`),
  adminPublish: (id: string) => api.post<ApiResponse<any>>(`/admin/draws/${id}/publish`),
  adminList: () => api.get<ApiResponse<IDraw[]>>('/admin/draws'),
};

export const charityApi = {
  getAll: (params?: any) => api.get<ApiResponse<ICharity[]>>('/charities', { params }),
  getOne: (id: string) => api.get<ApiResponse<ICharity>>(`/charities/${id}`),
  donate: (data: any) => api.post<ApiResponse<any>>('/charities/donate', data),
  verifyDonation: (data: any) => api.post<ApiResponse<any>>('/charities/verify-donation', data),
  getMyContribution: () => api.get<ApiResponse<any>>('/charities/my-contribution'),
  selectCharity: (charityId: string) => api.post<ApiResponse<any>>('/charities/select', { charityId }),
  updatePercentage: (percentage: number) => api.put<ApiResponse<any>>('/charities/percentage', { percentage }),
  adminCreate: (data: any) => api.post<ApiResponse<ICharity>>('/admin/charities', data),
  adminUpdate: (id: string, data: any) => api.put<ApiResponse<ICharity>>(`/admin/charities/${id}`, data),
  adminDelete: (id: string) => api.delete<ApiResponse<any>>(`/admin/charities/${id}`),
  adminAddEvent: (charityId: string, data: any) => api.post<ApiResponse<any>>(`/admin/charities/${charityId}/events`, data),
  adminDeleteEvent: (charityId: string, eventId: string) => 
    api.delete<ApiResponse<any>>(`/admin/charities/${charityId}/events/${eventId}`),
};

export const winnerApi = {
  getMyWins: () => api.get<ApiResponse<IWinner[]>>('/winners/my'),
  submitProof: (id: string, proofImageUrl: string) => 
    api.post<ApiResponse<any>>(`/winners/${id}/proof`, { proofImageUrl }),
  getStatus: (id: string) => api.get<ApiResponse<IWinner>>(`/winners/${id}/status`),
  adminList: (params?: any) => api.get<ApiResponse<IWinner[]>>('/admin/winners', { params }),
  adminVerify: (id: string, decision: string, notes: string) => 
    api.post<ApiResponse<any>>(`/admin/winners/${id}/verify`, { decision, notes }),
  adminMarkPaid: (id: string) => api.post<ApiResponse<any>>(`/admin/winners/${id}/pay`),
  adminPayoutSummary: () => api.get<ApiResponse<any>>('/admin/winners/payout-summary'),
};

export const adminApi = {
  getOverview: () => api.get<ApiResponse<any>>('/admin/overview'),
  getUsers: (params?: any) => api.get<ApiResponse<IUser[]>>('/admin/users', { params }),
  getDrawStats: () => api.get<ApiResponse<any>>('/admin/draw-stats'),
  getCharityLeaderboard: () => api.get<ApiResponse<any>>('/admin/charity-leaderboard'),
};

export const uploadApi = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post<ApiResponse<{ url: string }>>('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default api;
