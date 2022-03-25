import {
    SET_USER_LIST,
    SET_SPONSER_LIST,
    SET_USER_DETAILS,
    SET_PARTICIPANTS_LIST,
    SET_AGE_GROUPS,
    SET_MEDICAL_CONDITIONS,
} from '../actions/Types'
  
  const initialState = {
    UserList: false,
    SponserList: false,
    UserDetails:false,
    Participants:false,
    AgeGroups:false,
    Medicals:false,
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
      case SET_AGE_GROUPS:
        return {
          ...state,
          AgeGroups: action.payload,
        };
      case SET_MEDICAL_CONDITIONS:
        return {
          ...state,
          Medicals: action.payload,
        };
      default:
              return state;
    }
  };
  
  export default homeReducer;
  