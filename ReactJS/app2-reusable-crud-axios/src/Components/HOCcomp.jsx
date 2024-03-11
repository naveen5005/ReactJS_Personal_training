import React from 'react'
import { Component } from 'react'
import Axios from 'axios'
const HOCcomp = (OriginalComponent) => {
    class NewComp extends Component {
        constructor() {
            super();
            this.state = {
                allUsers: []
            }
        }
        commonServerCommunication = (method, payload) => {
            let url;
            method === "get" || method === "post" ? url = "http://localhost:3001/users" : url = "http://localhost:3001/users/" + payload.id
            if (method === "post") {
                Axios.post(url, payload);
            } else if (method === "get") {
                Axios.get(url).then((res) => {
                    this.setState({ allUsers: res.data });
                })
            } else if(method === "delete"){
                Axios.delete(url,payload);
            } else if(method === "put"){
                Axios.put(url,payload);
            }
        }
        render() {
            return <OriginalComponent 
            commonServerCommunication={this.commonServerCommunication}
            allUsers = {this.state.allUsers}
            />
        }
    }
    return NewComp
}

export default HOCcomp
