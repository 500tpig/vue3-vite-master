import http from '../index'

export function login(data: { username: string; password: string; type: number; client: string }): Promise<any> {
  return http.post('/user/login', data)
}
