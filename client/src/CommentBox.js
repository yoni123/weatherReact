import React from 'react';
import { Icon } from 'react-fa'
import './commentBox.css'
import { deleteComment } from "./actions/index";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    deleteComment: deleteComment
  }, dispatch);

};

const mapStateToProps = state => {
  return { reduxCities: state.cities };
};

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: props.id };
    console.log('v', props);
  }

  componentWillReceiveProps(newProps) {
   // this.setState({ id: newProps.id })
  }

  deleteComment = () => {
    this.props.deleteComment(this.props.cityId, this.props.commentId);
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-10">
          <p className="comment" >Written by: {this.props.userName} - {this.props.text}</p>
        </div>

        <div className="col-md-2">
          <button className="float-right delete-btn" onClick={this.deleteComment}>
            <Icon className="flost-right" name="trash" />
          </button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CommentBox);
