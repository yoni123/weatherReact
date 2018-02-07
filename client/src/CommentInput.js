import React from 'react';
import './commentInput.css'
class CommentInput extends React.Component {
  constructor(props) {
    super(props);
  }

  textChanged = () => {
    this.props.content(this.input.value, this.input.placeholder);
  }

  render() {
    return (
      <div className="input-group mb-3 input">
        <input type="text" ref={(val) =>this.input = val} onChange={this.textChanged} className="form-control" placeholder={this.props.placeholder} /><br />
      </div>
    )
  }
}

export default CommentInput;
