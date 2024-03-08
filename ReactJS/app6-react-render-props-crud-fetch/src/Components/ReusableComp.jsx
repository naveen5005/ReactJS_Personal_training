import React, { Component } from 'react'

export default class ReusableComp extends Component {

    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            persons: []
        }
    }

    commonServerCommunication = async (method, payload) => {
        let url;
        method === "GET" || method === "POST" ? url = "http://localhost:3001/persons" : url = "http://localhost:3001/persons/" + payload.id
        var results = await (await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: method === "POST" || method === "PUT" ? JSON.stringify(payload) : null
        })).json()
        if (method === "GET") {
            this.setState({ persons: results })
        }
    }
    render() {
        const { render } = this.props
        return (
            <div>
                {
                    render(this.commonServerCommunication, this.state.persons)
                }
            </div>
        )
    }
}


