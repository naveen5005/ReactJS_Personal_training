import React, { Component } from 'react'
import { UseContext } from './UseContext'

export default class MouseClassCounter extends Component {
  render() {
    return (
      <div>
        <hr />
        <h2>Welcome to Mouse Counter Class Component</h2>
        <UseContext.Consumer>
            {
                ({hoverCounter,handleIncrement,handleDecrement,handleReset})=>{
                    return(
                        <>
                            <p>Counter value is : {hoverCounter}</p>
                            <button type="button" onMouseOver={()=>handleIncrement()}>Increment</button>
                            <button type="button" onMouseOver={()=>handleDecrement()}>Decrement</button>
                            <button type="button" onMouseOver={()=>handleReset()}>Reset</button>
                        </>
                    )
                }
            }
        </UseContext.Consumer>
      </div>
    )
  }
}
