import React, { Component } from 'react'

export default class HoverCounter_Class extends Component {
  render() {
    const {counter,incrementCounter,decrementCounter,resetCounter} = this.props
    return (
      <div>
        <hr />
        <h1>Welcome to Hover counter class component</h1>
        <h2>Counter is {counter}</h2>
        <button type="button" onMouseOver={incrementCounter}>IncrementCount</button>
        <button type="button" onMouseOver={decrementCounter}>DecrementCount</button>
        <button type="button" onMouseOver={resetCounter}>ResetCount</button>
      </div>
    )
  }
}
