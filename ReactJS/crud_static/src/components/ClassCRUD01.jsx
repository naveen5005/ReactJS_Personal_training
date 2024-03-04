import React, { Component } from 'react'
import '../Styles/classCRUD01.css'

export default class ClassCRUD01 extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        fname: "",
        lname: ""
      },
      users: [
        {
          fname: "naveen",
          lname: "Kumar"
        },
        {
          fname: "Kiran",
          lname: "Kumar"
        }
      ],
      editIndex : null
    }
  }

  handleChange = (e) => {
    const newUser = { ...this.state.user };
    newUser[e.target.name] = e.target.value;
    this.setState({ user: newUser });
  }
  addUser = () => {
    const newUsers = [...this.state.users];
    newUsers.push(this.state.user);
    this.setState({ users: newUsers })
    this.clearForm();
  }
  clearForm = () => {
    const clearUser = {
      fname: "",
      lname: ""
    }
    this.setState({ user: clearUser })
  }
  deleteUser = (user, i) => {
    const newUsers = [...this.state.users];
    newUsers.splice(i, 1);
    this.setState({ users: newUsers })
  }
  editUser = (usr, i) => {
    this.setState({user:usr, editIndex :i});
  }
  updateUser = () => {
    const newUsers = [...this.state.users];
    newUsers[this.state.editIndex] = this.state.user;
    this.setState({users:newUsers,editIndex:null});
    this.clearForm();
  }
  render() {
    return (
      <div className='mainContainer'>
        <div className="formDisplay">
          <form action="">
            <label htmlFor="">FirstName : </label>
            <input type="text" name="fname" value={this.state.user.fname} onChange={this.handleChange} /> <br />
            <label htmlFor="">LastName : </label>
            <input type="text" name="lname" value={this.state.user.lname} onChange={this.handleChange} /> <br />
            {this.state.editIndex === null ? <button type="button" className='addUpdateStyle' onClick={this.addUser}>Add User</button>
            : <button type="button" onClick={this.updateUser} className='addUpdateStyle'>Update User</button>}
          </form>
        </div>
        <div className="tableDisplay">
          <table>
            <thead>
              <tr>
                <th>firstName</th>
                <th>lastName</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user, i) => {
                return (
                  <tr key={i}>
                    <td>{user.fname}</td>
                    <td>{user.lname}</td>
                    <td>
                      <button type="button" onClick={() => { this.editUser(user, i) }}>Edit</button>
                    </td>
                    <td>
                      <button type="button" onClick={() => { this.deleteUser(user, i) }}>Delete</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
