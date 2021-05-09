import api from './api';

export async function getContests(data) {
  const res = await api({
    method: 'GET',
    url: '/contests',
    param: {
      sort: data && data.sort,
      fields: data && data.fields,
    },
  });
  return res;
}

export async function getContest() {
  const res = await api({
    method: 'GET',
    url: '/contests/:id',
  });
  return res;
}

export async function createContest(data) {
  const res = await api({
    method: 'POST',
    url: '/contests',
    data,
  });
  return res;
}

export async function updateContest(id, data) {
  const res = await api({
    method: 'PUT',
    url: `/contests/${id}`,
    data,
  });
  return res;
}

export async function deleteContest(id) {
  const res = await api({
    method: 'DELETE',
    url: `/contests/${id}`,
  });
  return res;
}
