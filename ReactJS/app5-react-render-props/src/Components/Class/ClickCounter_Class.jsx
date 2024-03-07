import React, { Component } from 'react'

export default class ClickCounter_Class extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    render() {
        const{counter,incrementCounter,decrementCounter,resetCounter} = this.props
        return (
            <div>
                <hr />
                <h1>Welcome to Click counter Class Component</h1>
                <h2>Counter is {counter}</h2>
                <button type="button" onClick={incrementCounter}>Increment Count</button>
                <button type="button" onClick={decrementCounter}>Decrement Count</button>
                <button type="button" onClick={resetCounter}>reset Count</button>
            </div>
        )
    }
}
