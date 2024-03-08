import React from 'react'
import HOCcomp from '../HOCcomp'

const ClickCounterFunc = (props) => {
  return (
    <div>
        <h2>Welcome to Click Counter Functional Component</h2>
        <p>Counter is {props.counter}</p>
        <button type="button" onClick={props.handleIncrement}>Increment</button>
        <button type="button" onClick={props.handleDecrement}>Decrement</button>
        <button type="button" onClick={props.handleReset}>Reset</button>
    </div>
  )
}

export default HOCcomp(ClickCounterFunc)
