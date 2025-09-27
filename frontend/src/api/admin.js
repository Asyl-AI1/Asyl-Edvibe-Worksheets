import axios from 'axios';

export async function login(username, password) {
  return axios.post('/api/admin/login', { username, password }, { withCredentials: true });
}

export async function uploadWorksheet(data) {
  return axios.post('/api/admin/upload', data, { withCredentials: true });
}