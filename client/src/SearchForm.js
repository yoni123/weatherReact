import React from 'react';
import axios from 'axios';
import ServerManager from './ServerManager';
import { error } from 'util';

class CityObj {
  constructor(obj) {
    let { name, main: { temp }, weather: [first] } = obj.data;
    this.name = name;
    this.temp = Math.floor(temp);
    this.weather = first.main;
    this.imageUrl = 'http://openweathermap.org/img/w/' + first.icon + '.png';
    this._id = this.guid();
    this.comments = [];
  }
  s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  guid = () => {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

}


class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      cities: [],
      textInput: ""
    }
  }

 


  handleSubmit() {
// axios.get('/cities')
// .then(response => {
// console.log(response);
// })
// .catch(error => {
//   console.log('Error fetching and parsing data', error);
// });

    let city = this.input.value;
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=30067fef6af3503bfe31562948f3958b";
    axios.get(url)
      .then(response => {
        let newCity = new CityObj(response);
        this.setState({ cities: this.state.cities.concat([newCity]) }, () => {
          this.props.addedCity(this.state.cities)
        });
      })
      .catch(error => {
        alert("Invalid city");
        console.log('Error fetching and parsing data', error);
      });
  }


  render() {
    return (
      <div className="input-group mb-6">
        <input type="text" required className="form-control" placeholder="Enter City" ref={(text) => this.input = text} />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={this.handleSubmit} type="button">Button</button>
        </div>
      </div>


      // {/* <form action="#" id="getWeatherForm" onSubmit={this.handleSubmit}>
      //     <div className="input-group">
      //         <input
      //             type="text"
      //             className="form-control"
      //             id="city"
      //             placeholder="Enter city"
      //             required
      //             value={this.state.city}
      //             onChange={(event) => this.setState({city: event.target.value})}/>
      //         <span className="input-group-btn">
      //             <button className="btn btn-default" type="submit">Go!</button>
      //         </span>
      //     </div>
      // </form> */}
    );
  }
}

export default SearchForm;