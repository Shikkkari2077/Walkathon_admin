import {
    SET_USER_LIST,
    SET_SPONSER_LIST,
    SET_USER_DETAILS,
    SET_PARTICIPANTS_LIST,
} from '../actions/Types'
  
  const initialState = {
    UserList: false,
    SponserList: false,
    UserDetails:false,
    Participants:false,
  };
  
  const homeReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER_LIST:
        return {
          ...state,
          UserList: action.payload,
        };
      case SET_SPONSER_LIST:
        return {
          ...state,
          SponserList: action.payload,
        };
      case SET_USER_DETAILS:
        return {
          ...state,
          UserDetails: action.payload,
        };
      case SET_PARTICIPANTS_LIST:
        return {
          ...state,
          Participants: action.payload,
        };
      default:
              return state;
    }
  };
  
  export default homeReducer;
  