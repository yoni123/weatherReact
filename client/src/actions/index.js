import axios from 'axios';
import { error } from 'util';

export const addCityToDB = (city) => {
  return (dispatch) => {
    var url = '/city';
    axios.post(url, { city: city })
      .then(response => {
        console.log("dd", response);
        dispatch({ type: "ADD_CITY_TO_DB", payload: response.data });
      })
      .catch(error => {
        console.log("ererererer ", error.response)
        if(error.response.status === 500) {
       dispatch({ type: "INVALID_CITY", payload: error.response.data });
        }
      });
  }
}

export const getComments = (cityId) => {
  return {
    type: "GET_COMMENTS",
    payload: cityId
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
        console.log("somthing wrong");
        //dispatch({type: '', payload: ''});
      });
  }
}

export const deleteCity = (id) => {
  return (dispatch) => {
    const url = '/city/' +id
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
        console.log(response.data);
        dispatch({ type: 'ADD_COMMENT', payload: response.data });
      })
      .catch(error => {
        console.log("oops");
      });
  }
}

export const deleteComment = (cityId, commentId) => {
  console.log('dele');
  return (dispatch) => {
    const url = '/city/' + cityId +'/comment/' + commentId;
    axios.delete(url)
      .then(response => {
        console.log(response.data);
        dispatch({ type: 'DELETE_COMMENT', payload: response.data });
      })
      .catch(error => {
        console.log("oops");
      });
  }
}
