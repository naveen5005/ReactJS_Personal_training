import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addUser, deleteUser, updateUser } from '../Store/userSlice';

class Users extends Component {
    constructor(props) {
      super(props)
    console.log(props)
      this.state = {
         user :{
            uname : "",
            pwd:""
         },
         index :null
      }
    }
    
    handleChange = (e) =>{
        const newUser = {...this.state.user};
        newUser[e.target.name] = e.target.value;
        this.setState({user:newUser});
    }

    handleAddUser = () =>{
        this.state.user["id"] = Math.round(Math.random()*1000)
        console.log(this.state.user);
        this.props.dispatch(addUser(this.state.user));
    }
  render() {
    const {uname,pwd} = this.state.user;
    const {index,user} = this.state;
    const {users,dispatch} =this.props;
    return (
      <div>
        <div className="formDisplay">
            <form action="">
                <label htmlFor="">UserName : </label>
                <input type="text" name="uname" value={uname} onChange={this.handleChange} /> <br />
                <label htmlFor="">Password : </label>
                <input type="password" name="pwd" value={pwd} onChange={this.handleChange} /> <br />
                {
                    index === null ? <button type="button" onClick={this.handleAddUser}>Add User</button> :
                    <button type="button" onClick={()=>{
                        dispatch(updateUser(user));
                        this.setState({index:null});
                    }}>Update User</button>
                }
            </form>
        </div> <br />
        <div className="tableDisplay">
            <table border={2}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((usr,i)=>{
                            return(
                                <tr key={i}>
                                    <td>{usr.uname}</td>
                                    <td>{usr.pwd}</td>
                                    <td>
                                        <button type="button" onClick={()=>this.setState({user : usr,index : usr.id})}>edit</button>
                                    </td>
                                    <td>
                                        <button type="button" onClick={()=>dispatch(deleteUser(usr))}>delete</button>
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

function mapStatesToProps(state){
    console.log(state)
    return{
        users : state.users
    }
}

export default connect(mapStatesToProps)(Users)