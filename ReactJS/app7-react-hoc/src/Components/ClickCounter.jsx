import React, { Component } from 'react'
import HOCcomp from './HOCcomp'

class ClickCounter extends Component {
    render() {
        return (
            <div>
                <h2>Welcome to the Click Counter class component</h2>
                <p>Counter value is {this.props.counter}</p>
                <button type="button" onClick={this.props.handleIncrement}>Increment</button>
                <button type="button" onClick={this.props.handleDecrement}>Decrement</button>
                <button type="button" onClick={this.props.handleReset}>Reset</button>
            </div>
        )
    }
}

export default HOCcomp(ClickCounter)