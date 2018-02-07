import React from 'react';
import WeatherBox from './WeatherBox'


class WeatherListBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cities: []};
  }
  
  componentWillReceiveProps(newProps) {
    this.setState({cities: newProps.cities})
  }

  deleteCity = (id) => {
    this.props.deleteCity(id);
  }
  addComment = (comment) => {
    this.props.addComment(comment);
  }

  deleteComment = (id) => {
    this.props.deleteComment(id);
  }
  render() {
    return (
      <div className="container">
      <div className="row">
        {this.state.cities.map((city, index) =>
        <WeatherBox deleteComment = {this.deleteComment} cities={this.props.cities} addComment={this.addComment} key={index} id={city._id} name={city.name} temp={city.temp}
        deleteCity={this.deleteCity} weather={city.weather} imgUrl={city.imageUrl}/>
        )}
        </div>
      </div>
    )
  }
}

export default WeatherListBox;