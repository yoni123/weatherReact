import React from 'react';
import CommentInput from './CommentInput'
class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userNameText: "", commentText: "" };
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

  submitComment = () => {
    let comment = {
      userName: this.state.userNameText,
      commentText: this.state.commentText,
      id: this.guid()
    }
    this.props.addComment(comment);
  }

  content = (text, type) => {
    if (type == "User name") {
      this.setState({ userNameText: text });
    } else {
      this.setState({ commentText: text });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12 justify-content-center">
          <CommentInput placeholder="User name" content={this.content} />
          <CommentInput placeholder="Enter comment" content={this.content} />
          <button className="btn btn-primary float-left" onClick={this.submitComment}>submit</button>
        </div>
      </div>
    )
  }
}

export default CommentForm;