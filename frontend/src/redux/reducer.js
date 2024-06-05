const initialState = {
  isLoggedIn: localStorage.getItem('isAuthenticated') === 'true',
  email: '',
  userId: null,
  token: '',
  role: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'USER_LOGIN':
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('token', action.payload.token);  // Optionally store the token in localStorage
          return {
              ...state,
              isLoggedIn: true,
              email: action.payload.email,
              userId: action.payload.userId,
              token: action.payload.token,
              role: action.payload.role
          };
      case 'LOGOUT':
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('token');  // Clean up token from localStorage
          return {
              ...initialState,
              isLoggedIn: false
          };
      default:
          return state;
  }
};

export default authReducer;

// Selector
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
