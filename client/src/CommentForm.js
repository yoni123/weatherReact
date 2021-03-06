import React from 'react';
import CommentInput from './CommentInput'
import { addComment } from "./actions/index";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addComment: addComment
  }, dispatch);
};

const mapStateToProps = state => {
  return { reduxCities: state.cities };
};

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userNameText: "", commentText: "", val: "" };
  }

  submitComment = () => {
    let comment = {
      userName: this.state.userNameText,
      text: this.state.commentText,
    }

    if (comment.userName && comment.text) {
      this.setState({ userNameText: "", commentText: "" });
      this.props.addComment(this.props.cityId, comment);
    }
  }

  content = (text, type) => {
    if (type === "User name") {
      this.setState({ userNameText: text });
    } else {
      this.setState({ commentText: text });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12 justify-content-center">
          <CommentInput placeholder="User name" content={this.content} val={this.state.userNameText} />
          <CommentInput placeholder="Enter comment" content={this.content} val={this.state.commentText} />
          <button className="btn btn-primary float-left" onClick={this.submitComment}>Send</button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);