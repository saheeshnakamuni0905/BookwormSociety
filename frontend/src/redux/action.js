export const loginAction = (userData) => ({
  type: 'USER_LOGIN',
  payload: {
      email: userData.email,
      userId: userData.userId,
      token: userData.token,
      role: userData.role
  }
});

export const logoutAction = () => ({
  type: 'LOGOUT',
});
