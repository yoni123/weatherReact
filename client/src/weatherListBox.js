import React from 'react';
import WeatherBox from './WeatherBox'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

const mapStateToProps = state => {
  return { reduxCities: state.cities };
};

class WeatherListBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cities: [] };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ cities: newProps.reduxCities })
  }

  render() {
    if (!this.state.cities) {
      return (<div></div>)
    }
    return (
      <div className="container">
        <div className="row justify-content-center">
          {this.state.cities.map((city, index) =>
            <WeatherBox key={city._id} id={city._id} cityName={city.name} />
          )}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(WeatherListBox);