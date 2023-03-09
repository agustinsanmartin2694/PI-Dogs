const initialState = {
  temperaments: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "getTemperaments":
      return { ...state, temperaments: action.payload };
    default:
      return {
        ...state,
      };
  }
}
