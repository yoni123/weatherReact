import axios from 'axios';

export const addCityToDB = (city) => {
  return (dispatch) => {
    var url = '/city';
    axios.post(url, { city: city })
      .then(response => {
        dispatch({ type: "ADD_CITY_TO_DB", payload: response.data });
      })
      .catch(error => {
        if (error.response.status === 500) {
          dispatch({ type: "INVALID_CITY", payload: error.response.data });
        }
      });
  }
}

export const getAllCities = () => {
  return (dispatch) => {
    const url = '/cities';
    axios.get(url)
      .then(response => {
        dispatch({ type: 'GET_ALL_CITIES', payload: response.data });
      })
      .catch(error => {
        //dispatch({type: '', payload: ''});
      });
  }
}

export const deleteCity = (id) => {
  return (dispatch) => {
    const url = '/city/' + id
    axios.delete(url)
      .then(response => {
        dispatch({ type: 'DELETE_CITY', payload: response.data });
      })
      .catch(error => {
        console.log("oops");
      });
  }
}

export const addComment = (id, comment) => {
  return (dispatch) => {
    const url = '/comment/' + id;
    axios.post(url, comment)
      .then(response => {
        dispatch({ type: 'ADD_COMMENT', payload: response.data });
      })
      .catch(error => {
        console.log("oops");
      });
  }
}

export const deleteComment = (cityId, commentId) => {
  return (dispatch) => {
    const url = '/city/' + cityId + '/comment/' + commentId;
    axios.delete(url)
      .then(response => {
        dispatch({ type: 'DELETE_COMMENT', payload: response.data });
      })
      .catch(error => {
        console.log("oops");
      });
  }
}
