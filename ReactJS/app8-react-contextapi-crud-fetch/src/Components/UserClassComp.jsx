import React, { Component } from 'react'
import { Context } from './Context';

export default class UserClassComp extends Component {
    constructor() {
        super();
        this.state = {
            user: {
                fname: ""
            },
            users: [],
            index: null
        }
    }
    handleChange = (e) => {
        var newUser = { ...this.state.user };
        newUser[e.target.name] = e.target.value;
        this.setState({ user: newUser });
    }
    addUser = (commonServerCommunication) => {
        console.log(this.state.user)
        commonServerCommunication("POST", this.state.user);
        this.clearForm();
        this.componentDidMount();
    }
    clearForm = () => {
        this.setState({
            user: {
                fname: ""
            }
        })
    }
    deleteUser = (usr, commonServerCommunication) => {
        commonServerCommunication("DELETE", usr);
        this.componentDidMount();
    }
    editUser = (usr) => {
        this.setState({ user: usr, index: usr.id });
    }
    updateUser = (commonServerCommunication) => {
        commonServerCommunication("PUT", this.state.user);
        this.clearForm();
        this.setState({ index: null });
        this.componentDidMount();
    }
    componentDidMount() {
        fetch("http://localhost:3001/users", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            body: null
        }).then((res) => {
            return res.json();
        }).then((data) => {
            this.setState({ users: data });
        })
    }
    render() {
        const { fname } = this.state.user;
        return (
            <div>
                <Context.Consumer>
                    {
                        ({ commonServerCommunication }) => {
                            return (
                                <div>
                                    <div>
                                        <form action="">
                                            <label htmlFor="">FullName: </label>
                                            <input type="text" name="fname" value={fname} onChange={this.handleChange} /> <br />
                                            {
                                                this.state.index === null ? <button type="button" onClick={() => this.addUser(commonServerCommunication)}>Add User</button>
                                                    : <button type="button" onClick={() => this.updateUser(commonServerCommunication)}>update User</button>
                                            }
                                        </form>
                                    </div> <br />
                                    <div>
                                        <table border={2}>
                                            <thead>
                                                <tr>
                                                    <th>FullName</th>
                                                    <th>edit</th>
                                                    <th>delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.users.map((usr, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{usr.fname}</td>
                                                                <td>
                                                                    <button type="button" onClick={() => this.editUser(usr)}>edit</button>
                                                                </td>
                                                                <td>
                                                                    <button type="button" onClick={() => { this.deleteUser(usr, commonServerCommunication) }}>delete</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        }
                    }
                </Context.Consumer>
            </div>
        )
    }
}
