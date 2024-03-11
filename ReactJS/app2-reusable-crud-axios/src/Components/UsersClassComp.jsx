import React, { Component } from 'react'
import HOCcomp from './HOCcomp'
import Axios from 'axios';
class UsersClassComp extends Component {
    constructor(props) {
        super();
        this.state = {
            user: {
                fname: "",
                email: ""
            },
            index : null
        }
    }
    handleChange = (e) => {
        const newUser = { ...this.state.user };
        newUser[e.target.name] = e.target.value;
        this.setState({ user: newUser });
    }
    addUser = () => {
        this.props.commonServerCommunication("post", this.state.user);
        this.clearValues();
        this.props.commonServerCommunication("get");
    }
    handleDelete = (usr) => {
        this.props.commonServerCommunication("delete", usr);
        this.props.commonServerCommunication("get");
    }
    editUser = (usr) =>{
        this.setState({user:usr,index:usr.id});
    }
    updateUser = () =>{
        this.props.commonServerCommunication("put",this.state.user);
        this.clearValues();
        this.setState({index:null})
        this.props.commonServerCommunication("get");
    }
    clearValues = () => {
        this.setState({
            user: {
                fname: "",
                email: ""
            }
        })
    }
    componentDidMount() {
        this.props.commonServerCommunication("get");
    }

    render() {
        const { user,index } = this.state;
        const { allUsers } = this.props;
        return (
            <div className='mainComponent'>
                <div className="formDisplay">
                    <form action="">
                        <label htmlFor="">FullName : </label>
                        <input type="text" name="fname" value={user.fname} onChange={this.handleChange} /> <br />

                        <label htmlFor="">Email :</label>
                        <input type="email" name="email" value={user.email} onChange={this.handleChange} /> <br />
                        {
                            index === null ? <button type="button" onClick={this.addUser}>Add User</button>
                            : <button type="button" onClick={this.updateUser}>Update User</button>
                        }
                    </form>
                </div> <br />
                <div className="tableDisplay">
                    <table border={2}>
                        <thead>
                            <tr>
                                <th>FullName</th>
                                <th>Email</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allUsers.map((usr, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{usr.fname}</td>
                                            <td>{usr.email}</td>
                                            <td>
                                                <button type='button' onClick={()=> this.editUser(usr)}>edit</button>
                                            </td>
                                            <td>
                                                <button type="button" onClick={() => this.handleDelete(usr)}>delete</button>
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

export default HOCcomp(UsersClassComp)