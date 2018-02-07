import React from 'react';
import CommentBox from './CommentBox'

class CommentsListBox extends React.Component {
constructor(props) {
  super(props);
  this.state = {comments: []}
}
componentWillReceiveProps(newProps) {
  this.setState({comments: newProps.city.comments})
}

deleteComment = (id) => {
  this.props.deleteComment(id);
}
  render() {
    return (
      <div>
       
        {this.state.comments.map((obj, index) => {
        return <CommentBox key={index} deleteComment={this.deleteComment} userName={obj.userName} text={obj.commentText} id={obj.id}/>
        })}
        
      </div>
    )
  }
}

export default CommentsListBox;