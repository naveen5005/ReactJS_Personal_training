import React, { Component } from 'react'
import HOCcomp from './HOCcomp'

class HoverCounter extends Component {
  render() {
    return (
      <div>
        <hr />
        <h2>Welcome to Hover counter Class Component</h2>
        <p>Counte value is {this.props.counter}</p>
        <button type="button" onMouseOver={this.props.handleIncrement}>Increment</button>
        <button type="button" onMouseOver={this.props.handleDecrement}>Decrement</button>
        <button type="button" onMouseOver={this.props.handleReset}>Reset</button>
      </div>
    )
  }
}

export default HOCcomp(HoverCounter)