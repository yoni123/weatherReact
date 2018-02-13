import React from 'react';

import './weatherBox.css';
import CommentForm from './CommentForm'
import { Icon } from 'react-fa'
import CommentsListBox from './CommentsListBox'
import axios from 'axios';
import { deleteCity } from "./actions/index";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    deleteCity: deleteCity
  }, dispatch);

};

const mapStateToProps = state => {
  // console.log(state);
  return { reduxCities: state.cities };
};


// const mapStateToProps = state => {
//   // console.log(state);
//   return { reduxCities: state.cities };
// };


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

class WeatherBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", isLoading: true }
    this.weatherData(props.cityName, props.id);
  }

  weatherData = (cityName, cityId) => {
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=30067fef6af3503bfe31562948f3958b";
    axios.get(url)
      .then(response => {
        let city = new CityObj(response, cityId);
        this.setState({
          name: city.name,
          temp: city.temp,
          weather: city.weather,
          imageUrl: city.imageUrl,
          id: city._id,
          isLoading: false
        })
      })
      .catch(error => {
        // alert("Invalid city");
        console.log('Error fetching and parsing data', error);
      });
  }

  componentWillReceiveProps(newProps) {
    //console.log("rrrr" + this.props.cities[0]);
    // console.log("newprops: oo", newProps);
    //  this.weatherData(props.cityName, props.id);
  }

  deleteCity = () => {
    console.log('dele', this.state.id);
    this.props.deleteCity(this.state.id);
  }

  // addComment = (comment) => {
  //   let updateComment = {
  //     comment: comment,
  //     id: this.id
  //   }
  //   this.props.addComment(updateComment);
  // }

  _getObjectByid = (id) => {
    let { cities } = this.props;
    for (let i = 0; i < cities.length; i++) {
      if (cities[i]._id == id) {
        return i;
      }
    }
  }
  deleteComment = (id) => {
    let ids = {
      cityId: this.id,
      commentId: id
    }
    this.props.deleteComment(ids);
  }
  render() {
    if (this.state.isLoading) {
      console.log('stop loading');
    } else {
      console.log('loading');
      // return (
      //   <Icon name="spinner " spin/>
      // )
    }
    return (
      <div className="col-md-3 weather-container" ref={this.id = this.state.id} id={this.state.id}>

        <div className="inner">
          <div className={this.state.isLoading ? "d-block" : "d-none"}>
            <Icon name="spinner " spin />
          </div>
          <div className={`${!this.state.isLoading ? "" : "d-none "}row weather-box`}>
            <div className="col-sm-2 weather-img">
              <img src={this.state.imageUrl} alt="weather description img" />
            </div>
            <div className="col-sm-8">
              <h3 className="text-left">{this.state.name}</h3>
              <p className="text-left">{`${this.state.weather} ${this.state.temp} | C`}</p>
            </div>
            <div className="col-sm-2 delete-box-btn">
              <button className="float-right trash-btn" onClick={this.deleteCity}><Icon name="trash" /></button>
            </div>
          </div>
          <CommentForm cityId={this.state.id} />
          <CommentsListBox cityId={this.state.id} />
          {/* deleteComment={this.deleteComment} city={this.props.cities[this._getObjectByid(this.id)]}/> */}
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherBox);




