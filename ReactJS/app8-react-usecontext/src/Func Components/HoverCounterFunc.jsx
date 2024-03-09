import React from 'react'
import { UseContext } from '../Class Components/UseContext'

const HoverCounterFunc = () => {
    return (
        <div>
            <hr />
            <h2>Welcome to hover counter func component</h2>
            <UseContext.Consumer>
                {
                    ({ hoverCounter,handleIncrement,handleDecrement,handleReset }) => {
                        return (
                            <div>
                                <p>Counter value is {hoverCounter}</p>
                                <button type="button" onMouseOver={()=>handleIncrement("")}>Increment</button>
                                <button type="button" onMouseOver={()=>handleDecrement("")}>Decrement</button>
                                <button type="button" onMouseOver={()=>handleReset("")}>Reset</button>
                            </div>
                        )
                    }
                }
            </UseContext.Consumer>
        </div>
    )
}

export default HoverCounterFunc
