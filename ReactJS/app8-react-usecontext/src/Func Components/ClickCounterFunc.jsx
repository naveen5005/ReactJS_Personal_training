import React from 'react'
import { UseContext } from '../Class Components/UseContext'

const ClickCounterFunc = () => {
  return (
    <div>
        <hr />
      <h2>Welcome to Click counter Func Component</h2>
      <UseContext.Consumer>
        {
            ({clickCounter,handleIncrement,handleDecrement,handleReset})=>{
                return(
                    <div>
                        <p>Counter value is {clickCounter}</p>
                        <button type="button" onClick={()=>handleIncrement("click")}>Increment</button>
                        <button type="button" onClick={()=>handleDecrement('click')}>Decrement</button>
                        <button type="button" onClick={()=>handleReset('click')}>Reset</button>
                    </div>
                )
            }
        }
      </UseContext.Consumer>
    </div>
  )
}

export default ClickCounterFunc
