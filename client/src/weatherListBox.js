import React from 'react';
import WeatherBox from './WeatherBox'
import { connect } from "react-redux";
import { getAllCities } from "./actions/index";
import { bindActionCreators } from 'redux';
import axios from 'axios';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getAllCities: getAllCities
  }, dispatch);

};

const mapStateToProps = state => {
  return { reduxCities: state.cities };
};


class CityObj {
  constructor(obj, cityId) {
    let { name, main: { temp }, weather: [first] } = obj.data;
    this.name = name;
    this.temp = Math.floor(temp);
    this.weather = first.main;
    this.imageUrl = 'http://openweathermap.org/img/w/' + first.icon + '.png';
    this._id = cityId;
    this.comments = [];
  }

}
class WeatherListBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cities: []};
  }
  
  componentWillReceiveProps(newProps) {
    //console.log("new props: ",newProps)
    //console.log("recive props: ",newProps.reduxCities)

    this.setState({cities: newProps.reduxCities})
  }

  // deleteCity = (id) => {
  //   this.props.deleteCity(id);
  // }
  addComment = (comment) => {
    this.props.addComment(comment);
  }

  deleteComment = (id) => {
    this.props.deleteComment(id);
  }

weatherData = (cityName, cityId, index) => {
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=30067fef6af3503bfe31562948f3958b";
    axios.get(url)
      .then(response => {
        let city = new CityObj(response, cityId);
        console.log('twwww', city);

       return( <WeatherBox deleteComment = {this.deleteComment} cities={this.props.cities} addComment={this.addComment} key={index} id={city._id} name={city.name} temp={city.temp}
        deleteCity={this.deleteCity} weather={city.weather} imgUrl={city.imageUrl}/>)

      })
      .catch(error => {
        alert("Invalid city");
        console.log('Error fetching and parsing data', error);
      });
}

  render() {
    if(!this.state.cities) {
      return (<div></div>)
    }
    return (
      <div className="container">
      <div className="row">
        {this.state.cities.map((city, index) =>
        //console.log(city)
       <WeatherBox key={city._id} id={city._id} cityName={city.name}/>
        )}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherListBox);