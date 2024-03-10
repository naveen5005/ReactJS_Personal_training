import React, { Component } from 'react'
import { Context } from './Context'
import UserClassComp from './UserClassComp'
import UserFuncComp from './UserFuncComp';

export default class Resable extends Component {

    commonServerCommunication = async (method, payload) => {
        let url;
        method === "POST" ? url = "http://localhost:3001/users" : url = "http://localhost:3001/users/" + payload.id;
        var results = await (await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: method === "PUT" || method === "POST" ? JSON.stringify(payload) : null
        })).json();
    }
    render() {
        const { commonServerCommunication } = this;
        return (
            <div>
                <Context.Provider value={{ commonServerCommunication }}>
                    <UserClassComp />
                    <UserFuncComp/>
                </Context.Provider>
            </div>
        )
    }
}
