

const cityReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CITY': {
      console.log("wowow")
      return [...state, action.payload];
    }

    case 'GOT_DATA': {
      // console.log("got data");
      return [...state, action.payload];
    }

    case 'INVALID_CITY': {
      alert('oops... somthing went wrong! \nDid you type currect city?');
      return state;
    }

    case 'ADD_CITY_TO_DB': {
      if (action.payload.cod == 404) {
        alert(action.payload.message);
      } else if (action.payload.cod == 200) {
        console.log("got response ", action.payload.city)
        return [...state, action.payload.city];
      }
      //
    }

    case 'GET_ALL_CITIES': {
      return action.payload;
    }

    case 'DELETE_CITY': {
      return state.filter(({ _id }) => _id !== action.payload);
    }

    case 'ADD_COMMENT': {
      var found = state.find(({ _id }) => _id == action.payload._id);
      found.comments.push(action.payload.comment);
      console.log("found ", found);
      return [...state];
    }

    case 'DELETE_COMMENT': {
      var city = state.find(({ _id }) => _id == action.payload.cityId);

      city.comments.filter(({ _id }) => _id !== action.payload.commentId);
      console.log('delete comment', action.payload.commentId);

      return [...state];
    }

    default:
      return state;
  }
};

export default cityReducer;
