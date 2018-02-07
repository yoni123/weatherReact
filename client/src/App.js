import React, { Component } from 'react';
import './App.css';
import WeatherListBox from './weatherListBox';
import SearchForm from './SearchForm';
import ServerManager from './ServerManager';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { cities: [], comments: {} };
  }

  addComment = (obj) => {
    let index = this._getIndexByid(obj.id);
    let {cities} = this.state;
    let temp =  cities[index];
    temp.comments.push(obj.comment);
    cities.splice(index, 1, temp);
    this.setState({ cities: cities });
  }

  addedCity = (cities) => {
    // axios.post('/city')
    // .then(response => {

    // })
    // .catch(error => {
    //   console.log('Error fetching and parsing data', error);

    // });
    this.setState({ cities: cities });

  }
  _getIndexByid = (id) => {
    let { cities } = this.state;
    for (let i = 0; i < cities.length; i++) {
      if (cities[i]._id == id) {
        return i;
      }
    }
  }
  deleteCity = (id) => {
    let index = this._getIndexByid(id);
    let temp = this.state.cities;
    temp.splice(index, 1);
    this.setState({ cities: temp });
  }

  deleteComment = (ids) => {
  //  console.log(ids);
    let index = this._getIndexByid(ids.cityId);
    //console.log(this.state.cities[index].comments);
    let {cities} = this.state;
    let temp = cities[index].comments;
    temp = temp.filter(function(e) {
      return e.id !== ids.commentId;
    });
    cities[index].comments = temp;
   // console.log(temp);
    this.setState({cities: cities});
  }

  render() {
    return (
      <div className="App">
        <div className="row justify-content-center">

          <div className="page-header col-md-6">
            <h1>Weather app</h1>
            <SearchForm addedCity={this.addedCity} />
          </div>
        </div>
        <WeatherListBox deleteComment={this.deleteComment} addComment={this.addComment} cities={this.state.cities} deleteCity={this.deleteCity} />
      </div>
    );
  }
}

export default App;
