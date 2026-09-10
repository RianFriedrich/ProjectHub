import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('projecthub_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('projecthub_token')
      localStorage.removeItem('projecthub_user')
    }
    return Promise.reject(error)
  },
)

export type User = { id: number; name: string; email: string; createdAt: string }
export type Project = { id: number; name: string; description?: string | null; createdAt: string; updatedAt: string; ownerId?: number; _count?: { tasks: number } }
export type Task = { id: number; title: string; description?: string | null; status: 'TODO' | 'IN_PROGRESS' | 'DONE'; createdAt: string; updatedAt: string; projectId: number; assigneeId?: number | null }

export const auth = {
  async login(email: string, password: string) {
    return api.post<{ token: string; user?: User }>('/auth/login', { email, password })
  },
  microsoftUrl() {
    return `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/microsoft`
  },
}

export const projectsApi = {
  list(params?: { page?: number; limit?: number; search?: string }) {
    return api.get<{ data: Project[]; page: number; limit: number; search: string; total: number; totalPages: number }>('/projects', { params })
  },
  create(data: { name: string; description?: string }) { return api.post<Project>('/projects', data) },
  get(id: number) { return api.get<Project>(`/projects/${id}`) },
  update(id: number, data: { name?: string; description?: string | null }) { return api.put<Project>(`/projects/${id}`, data) },
  remove(id: number) { return api.delete(`/projects/${id}`) },
  tasks(id: number, status?: string) { return api.get<Task[]>(`/projects/${id}/tasks`, { params: status ? { status } : undefined }) },
}

export const tasksApi = {
  create(projectId: number, data: { title: string; description?: string; status?: Task['status']; assigneeId?: number }) { return api.post<Task>(`/projects/${projectId}/tasks`, data) },
  update(id: number, data: Partial<Pick<Task, 'title' | 'description' | 'status' | 'assigneeId'>>) { return api.put<Task>(`/tasks/${id}`, data) },
  remove(id: number) { return api.delete(`/tasks/${id}`) },
}

export const usersApi = { list() { return api.get<User[]>('/users') } }
