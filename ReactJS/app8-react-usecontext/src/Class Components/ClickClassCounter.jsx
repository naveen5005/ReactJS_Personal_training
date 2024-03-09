import { Component } from "react";
import { UseContext } from "./UseContext";

export default class ClickClassCounter extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }
    render() {
        return (
            <div>
                <h2>Welcome to Click counter class component</h2>
                <UseContext.Consumer>
                    {
                        ({ clickCounter,handleIncrement,handleDecrement,handleReset }) => {
                            return <>
                                <p>Counter value is : {clickCounter}</p>
                                <button type="button" onClick={()=>handleIncrement('click')}>Increment</button>
                                <button type="button" onClick={()=>handleDecrement('click')}>Decrement</button>
                                <button type="button" onClick={()=>handleReset('click')}>Reset</button>
                            </>
                        }
                    }
                </UseContext.Consumer>
            </div>
        )
    }
}