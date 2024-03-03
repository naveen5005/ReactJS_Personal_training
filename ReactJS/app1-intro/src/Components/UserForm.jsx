import React, { Component } from "react";

export default class UserForm extends Component {
  constructor() {
    super();
    this.state = {
      person: {
        fname: "",
      },
    };
  }

  handleChange = (e) => {
    // this.state.person.fname = "Ram" // This kind of Value assining is not allowed in ReactJS . You Are Not allowed to Change the State Directly 
    const newPerson = {... this.state.person} // Created a Copy of Person
    console.log(document.getElementById("fname").value);
    // newPerson[e.target.name] = document.getElementById(e.target.name).value
    newPerson[e.target.name] = e.target.value ; // Added a Value for the Object
    this.setState({person:newPerson});// Updating the State with the Copied Object . 
  };
  render() {
    return (
      <div>
        <form>
          <label htmlFor="">First Name : </label>
          <input type="text" name="fname" value={this.state.person.fname} onChange={this.handleChange} id="fname"/> <br />
          <button>Add User</button>
        </form>
      </div>
    );
  }
}
