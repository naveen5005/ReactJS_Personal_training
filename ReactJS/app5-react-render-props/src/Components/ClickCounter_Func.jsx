import React, { useState } from 'react'

const ClickCounter_Func = ({counter,incrementCount,decrementCount,resetCount}) => {
  return (
    <div>
      <h2>Welcome to Click Counter Function Component</h2>
      <p>Counter is  {counter}</p>
      <button type="button" onClick={incrementCount}>Increment Count</button>
      <button type="button" onClick={decrementCount}>Decrement Count</button>
      <button type="button" onClick={resetCount}>Reset Count</button>
    </div>
  )
}

export default ClickCounter_Func
