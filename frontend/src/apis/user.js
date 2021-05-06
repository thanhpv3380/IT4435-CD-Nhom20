import api from './api';

export async function updateUser(user) {
  const userInfo = await api({
    method: 'PUT',
    url: '/users',
    data: user,
  });
  return userInfo;
}
