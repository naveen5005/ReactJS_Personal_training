import React, { useState } from 'react'

const HoverCounter_Func = ({counter,incrementCount,decrementCount,resetCount}) => {

  return (
    <div>
      <h2>Welcome to Click Counter Function Component</h2>
      <p>Counter is  {counter}</p>
      <button type="button" onMouseOver={incrementCount}>Increment Count</button>
      <button type="button" onMouseOver={decrementCount}>Decrement Count</button>
      <button type="button" onMouseOver={resetCount}>Reset Count</button>
    </div>
  )
}

export default HoverCounter_Func
