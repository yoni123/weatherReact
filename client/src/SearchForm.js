import React from 'react';
import { connect } from "react-redux";
import { addCityToDB } from "./actions/index";
import { bindActionCreators } from 'redux';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addCityToDB: addCityToDB,
  }, dispatch);
};

class ConnectedSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    let city = this.input.value;
    if (city !== "") {
      this.props.addCityToDB(city);
    }
  }

  render() {
    return (
      <div className="input-group mb-6">
        <input type="text" required className="form-control" placeholder="Enter City" ref={(text) => this.input = text} />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={this.handleSubmit} type="button">Search</button>
        </div>
      </div>
    );
  }
}

const SearchForm = connect(null, mapDispatchToProps)(ConnectedSearchForm);
export default SearchForm;