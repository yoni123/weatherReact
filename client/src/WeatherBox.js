import React from 'react';

import './weatherBox.css';
import CommentForm from './CommentForm'
import {Icon} from 'react-fa'
import CommentsListBox from './CommentsListBox'


class WeatherBox extends React.Component {
constructor(props) {
  super(props);
  this.state = {name: ""}
}

componentWillReceiveProps(newProps) {
  //console.log("rrrr" + this.props.cities[0]);
}

deleteCity = () =>{
  this.props.deleteCity(this.id);
}

addComment = (comment) => {
  let updateComment = {
    comment: comment,
    id: this.id
  }
  this.props.addComment(updateComment);
}

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
    return (
      <div className="col-md-3" id={this.props.id} ref={this.id = this.props.id}>
      <div className="inner">
        <div className="row weather-box">
          <div className="col-sm-2 weather-img">
            <img src={this.props.imgUrl} alt="weather description img"/>
          </div>
          <div className="col-sm-8">

            <h3 className="text-left">{this.props.name}</h3>
            <p className="text-left">{`${this.props.weather}- ${this.props.temp} | C`}</p>
          </div>
          <div className="col-sm-2 delete-box-btn">
            <button className="float-right trash-btn" onClick={this.deleteCity}><Icon name="trash" /></button>
          </div>
        </div>
        <CommentForm addComment={this.addComment}/>
        <CommentsListBox deleteComment={this.deleteComment} city={this.props.cities[this._getObjectByid(this.id)]}/>
      </div>

      </div>
    )
  }
}

export default WeatherBox;