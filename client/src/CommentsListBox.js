import React from 'react';
import CommentBox from './CommentBox'
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
const mapStateToProps = state => {
  // console.log(state);
  return { reduxCities: state.cities };
};

class CommentsListBox extends React.Component {
constructor(props) {
  super(props);
  //console.log("comments :)", props);

  this.state = {cityId: props.cityId, currentCity: props.reduxCities.find(({ _id }) => _id == props.cityId)}
  // console.log(this.state);
  // var found = props.reduxCities.find(function(element) {
  //   return element._id > 10;
  // });
  
}
componentWillReceiveProps(newProps) {
 // this.setState({comments: newProps.city.comments})
  console.log("new propsi", newProps)
 this.setState({cityId: newProps.cityId, currentCity: newProps.reduxCities.find(({ _id }) => _id == newProps.cityId)})
}

componentWillMount(props) {
  //console.log()
}

  render() {
    if(!this.state.currentCity) {
      return(<div></div>)
    }
    return (
      <div>
       
        {this.state.currentCity.comments.map((comment, index) => {
        return <CommentBox key={comment._id} cityId={this.state.cityId} userName={comment.userName} text={comment.text} commentId={comment._id}/>
        })}
        
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(CommentsListBox);



