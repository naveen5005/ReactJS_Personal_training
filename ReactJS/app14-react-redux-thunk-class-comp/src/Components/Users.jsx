import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleDeleteUserAsyncFunc, handleGetUserAsyncFunc, handlePostUserAsyncFunc, handleUpdateUserAsyncFunc } from '../Store/action'
class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                uname: "",
                password: ""
            },
            index: null
        }
    }

    componentDidMount() {
        this.getDetails();
    }
    getDetails = () => {
        this.props.dispatch(handleGetUserAsyncFunc());
    }

    handleChange = (e) => {
        const newUser = { ...this.state.user };
        newUser[e.target.name] = e.target.value;
        this.setState({ user: newUser });
    }
    handleAddUser = () => {
        this.props.dispatch(handlePostUserAsyncFunc(this.state.user));
    }
    handleDeleteUser = (usr) => {
        console.log(usr)
        this.props.dispatch(handleDeleteUserAsyncFunc(usr));
    }
    handleEditUser = (usr) => {
        this.setState({ user: usr, index: usr.id });
    }
    handleUpdateUser = () =>{
        this.props.dispatch(handleUpdateUserAsyncFunc(this.state.user));
        this.setState({index : null})
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <h2>Welcome</h2>
                <form action="">
                    <label htmlFor="">UserName : </label>
                    <input type="text" name="uname" value={this.state.user.uname} onChange={this.handleChange} /> <br />
                    <label htmlFor="">Password : </label>
                    <input type="password" name="password" value={this.state.user.password} onChange={this.handleChange} /> <br />
                    {
                        this.state.index === null ? <button type="button" onClick={this.handleAddUser}>Add</button> :
                        <button type="button" onClick={this.handleUpdateUser}>Update</button>
                    }
                </form> <br />
                <table border={2}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.users.map((usr, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{usr.id}</td>
                                        <td>{usr.uname}</td>
                                        <td>{usr.password}</td>
                                        <td>
                                            <button type="button" onClick={() => this.handleEditUser(usr, i)}>edit</button>
                                        </td>
                                        <td>
                                            <button type="button" onClick={() => this.handleDeleteUser(usr, i)}>delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        users: state.users
    }
}
export default connect(mapStateToProps)(Users)