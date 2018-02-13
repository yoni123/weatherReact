import React from 'react';
import CommentBox from './CommentBox'
import { connect } from "react-redux";
import './commentsListBox.css';

const mapStateToProps = state => {
  return { reduxCities: state.cities };
};

class CommentsListBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cityId: '', comments: [] }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      cityId: newProps.cityId,
      comments: newProps.reduxCities.find(({ _id }) =>
        _id === newProps.cityId).comments
    })
  }

  render() {
    if (!this.state.comments) {
      return (<div></div>)
    }
    return (
      <div className="comments-list">
        {this.state.comments.map((comment, index) => {
          return <CommentBox key={comment._id} cityId={this.state.cityId} comment={comment} />
        })}
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(CommentsListBox);



