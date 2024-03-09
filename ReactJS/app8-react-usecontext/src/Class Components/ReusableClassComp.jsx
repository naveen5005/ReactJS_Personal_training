import React, { Component } from 'react'
import { UseContext } from './UseContext';
import ClickClassCounter from './ClickClassCounter';
import MouseClassCounter from './MouseClassCounter';
import ClickCounterFunc from '../Func Components/ClickCounterFunc';
import HoverCounterFunc from '../Func Components/HoverCounterFunc';


export default class ReusableClassComp extends Component {
    constructor() {
        super();
        this.state = {
            clickCounter: 0,
            hoverCounter :0
        }
    }
    handleIncrement = (type) => {
        type === "click" ? this.setState({ clickCounter: this.state.clickCounter + 1 }) 
        : this.setState({ hoverCounter: this.state.hoverCounter + 1 });
    }
    handleDecrement = (type) => {
        type ==="click" ?this.setState({ clickCounter: this.state.clickCounter - 1 })
        : this.setState({ hoverCounter: this.state.hoverCounter - 1 });
    }
    handleReset = (type) => {
        type ==="click" ? this.setState({ clickCounter: 0 })
        : this.setState({ hoverCounter: 0 });
    }
    render() {
        const {clickCounter,hoverCounter} = this.state;
        const{handleIncrement,handleDecrement,handleReset} = this;
        return (
            <div>
                <UseContext.Provider value={{clickCounter,hoverCounter,handleIncrement,handleDecrement,handleReset}}>
                    <ClickClassCounter/>
                    <MouseClassCounter/>
                    <ClickCounterFunc/>
                    <HoverCounterFunc/>
                </UseContext.Provider>
            </div>
        )
    }
}
