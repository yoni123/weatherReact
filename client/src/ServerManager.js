import axios from 'axios';
import React, { Component } from 'react';


class CityObj {
  constructor(obj) {
    let { name, main: { temp }, weather: [first] } = obj.data;
    this.name = name;
    this.temp = Math.floor(temp);
    this.weather = first.main;
    this.imageUrl = 'http://openweathermap.org/img/w/' + first.icon + '.png';
    this._id = this.guid();
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



class ServerManager {
  

 // init = () => {
    
 // }

  //cities = [];

  static addCity = (city, callBack) => {
  //debugger;
    if (!this.cities) {
      console.log("und")
       this.cities = new Array();
    }        
    
    //console.log(typeof this.cities)


    console.log("type "+ this.cities instanceof Array);
     var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=30067fef6af3503bfe31562948f3958b";
    axios.get(url)
      .then(response => {
        let newCity = new CityObj(response);
         console.log(typeof this.cities)
        console.log(newCity);
        this.cities.push(newCity);
        callBack(this.cities);
        // var promise1 = new Promise(function(resolve, reject) {
          
        //   setTimeout(function(){
        //     resolve();
        //   }, 1000);
        // });
        // promise1.then(() => {
        //   console.log("promise: " +ServerManager.cities[0]);
        //   //return ServerManager.cities;
        // });
     
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
     // return ServerManager.cities;
  }

  static getAllCities = () => {
    return this.cities;
  }
}

export default ServerManager;