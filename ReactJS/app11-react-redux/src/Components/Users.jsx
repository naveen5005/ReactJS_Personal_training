import React, { Component } from 'react'
import { connect } from 'react-redux'

class Users extends Component {

  render() {
    const users = this.props.users;
    return (
      <div>
        <h2>Welcome to Users Class Component</h2>
        <ul>
            {
                users.map((usr,i)=>{
                    return(
                        <li key={i}>{usr}</li>
                    )
                })
            }
        </ul>
      </div>
    )
  }
}
function mapStateToProps(state){
    // console.log(state)
    return{
        users : state.users
    }
}
export default connect(mapStateToProps)(Users)