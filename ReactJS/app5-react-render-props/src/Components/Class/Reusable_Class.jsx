import React, { Component } from 'react'

export default class Reusable_Class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0
        }
    }
    incrementCounter = () => {
        this.setState({ counter: this.state.counter + 1 })
    }
    decrementCounter = () => {
        this.setState({ counter: this.state.counter - 1 })
    }
    resetCounter = () => {
        this.setState({ counter: 0 })
    }
    render() {
        const {render} = this.props
        return (
            <div>
                {
                    render(this.state.counter,this.incrementCounter,this.decrementCounter,this.resetCounter)
                }
            </div>
        )
    }
}
