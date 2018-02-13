
const cityReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CITY': {
      return [...state, action.payload];
    }

    case 'INVALID_CITY': {
      alert(action.payload);
      return state;
    }

    case 'ADD_CITY_TO_DB': {
      if (action.payload.cod === 404) {
        alert(action.payload.message);
      } else if (action.payload.cod === 200) {
        if (!action.payload.isexist) {
          return [...state, action.payload.city];
        } else {
          return state;
        }
      }
      break;
    }


    case 'GET_ALL_CITIES': {
      return action.payload;
    }

    case 'DELETE_CITY': {
      return state.filter(({ _id }) => _id !== action.payload);
    }

    case 'ADD_COMMENT': {
      var found = state.find(({ _id }) => _id === action.payload._id);
      found.comments.push(action.payload.comment);
      return [...state];
    }

    case 'DELETE_COMMENT': {
      let city = state.find(({ _id }) => _id === action.payload.cityId);
      let filteredArray = city.comments.filter(({ _id }) => _id !== action.payload.commentId);
      city.comments = filteredArray;
      return [...state];
    }

    default:
      return state;
  }
};

export default cityReducer;
