import React from 'react'

const HOCcomp = (OriginalComponent) => {

    class NewComponent extends React.Component {
        constructor() {
            super()
            this.state = {
                users: []
            }
        }
        commonServerCommunication = async (method, payload) => {
            let url;
            method === "GET" || method === "POST" ? url = "http://localhost:3001/users" : url = "http://localhost:3001/users/" + payload.id
            var results = await (await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: method === "POST" || method === "PUT" ? JSON.stringify(payload) : null
            })).json()
            if (method === "GET") {
                this.setState({ users: results });
                console.log(this.state.users);
            }
        }
        render() {
            console.log(this.state.users)
            return <OriginalComponent
                commonServerCommunication={this.commonServerCommunication}
                users={this.state.users}
            />
        }
    }
    return NewComponent
}

export default HOCcomp
