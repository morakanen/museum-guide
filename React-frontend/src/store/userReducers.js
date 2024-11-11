const initialState = {
    userInfo: null,
    error: null,
  };
  
  export default function userReducer(state = initialState, action) {
    switch (action.type) {
      case 'USER_REGISTER_SUCCESS':
        return { ...state, userInfo: action.payload, error: null };
      case 'USER_REGISTER_FAIL':
        return { ...state, error: action.payload };
      default:
        return state;
    }
  }