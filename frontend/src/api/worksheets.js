import axios from 'axios';

export async function listWorksheets(params) {
  const res = await axios.get('/api/worksheets', { params });
  return res.data.worksheets;
}

export async function getWorksheet(id) {
  const res = await axios.get(`/api/worksheets/${id}`);
  return res.data;
}