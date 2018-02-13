import React from 'react';
import './commentInput.css'
class CommentInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { val: props.val }
  }

  textChanged = () => {
    this.props.content(this.input.value, this.input.placeholder);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ val: newProps.val })
  }

  render() {
    return (
      <div className="input-group mb-3 input">
        <input type="text" ref={(val) => this.input = val} onChange={this.textChanged}
          className="form-control" placeholder={this.props.placeholder} value={this.state.val} /><br />
      </div>
    )
  }
}

export default CommentInput;
