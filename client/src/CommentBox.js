import React from 'react';
import { Icon } from 'react-fa'
import './commentBox.css'
class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: props.id };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ id: newProps.id })
  }

  deleteComment = () => {
    console.log(this.state.id);
    this.props.deleteComment(this.state.id);
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

export default CommentBox;
