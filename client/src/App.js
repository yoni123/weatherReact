import React, { Component } from 'react';
import './App.css';
import WeatherListBox from './weatherListBox';
import SearchForm from './SearchForm';
import { connect } from "react-redux";
import { getAllCities } from "./actions/index";
import { bindActionCreators } from 'redux';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getAllCities: getAllCities
  }, dispatch);
};

const mapStateToProps = state => {
  return { reduxCities: state.cities };
};

class ConnectedApp extends Component {
  constructor(props) {
    super(props);
    this.props.getAllCities();
  }

  render() {
    return (
      <div className="App">
        <div className="row justify-content-center">
          <div className="page-header col-sm-6 col-8">
            <h1>Weather app</h1>
            <SearchForm />
          </div>
        </div>
        <WeatherListBox />
      </div>
    );
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);
export default App;
