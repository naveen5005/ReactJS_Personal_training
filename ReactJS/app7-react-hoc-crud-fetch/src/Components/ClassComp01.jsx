import React, { Component } from 'react'
import HOCcomp from './HOCcomp';

class ClassComp01 extends Component {
    constructor(props){
        super(props);
        console.log(props)
        this.state ={
            user : {
                fname : "",
                gender : "",
                areasOfInterest : [],
                state : ""
            },
            index : null
        }
    }
    handleChange = (e) =>{
        const newUser ={...this.state.user};
        if(e.target.name === "areasOfInterest"){
            if(e.target.checked){
                newUser[e.target.name].push(e.target.value)
            }else{
                const index = newUser[e.target.name].indexOf(e.target.value);
                if(index !== -1){
                    newUser[e.target.name].splice(index,1);
                }
            }
        }
        else{
            newUser[e.target.name] = e.target.value;
        }
        this.setState({user:newUser});
    }
    addUser = () =>{
        this.props.commonServerCommunication("POST",this.state.user);
        this.clearForms();
        this.props.commonServerCommunication("GET");
    }
    componentDidMount(){
        this.props.commonServerCommunication("GET")
    }
    deleteUser = (usr) =>{
        this.props.commonServerCommunication("DELETE",usr);
        this.props.commonServerCommunication("GET");
    }
    editUser = (usr) =>{
        this.setState({user:usr,index : usr.id});
    }
    updateUser = () =>{
        this.props.commonServerCommunication("PUT",this.state.user);
        this.setState({index:null});
        this.clearForms();
        this.props.commonServerCommunication("GET");
    }
    clearForms = () =>{
        this.setState({user:{
            fname:"",
            gender:"",
            areasOfInterest :[],
            state :""
        }})
    }
  render() {
    const{fname,gender,areasOfInterest,state} = this.state.user;
    const{index} = this.state;
    return (
      <div>
        <div>
            <form action="">
                <label htmlFor="">Fullname : </label>
                <input type="text" name="fname" value={fname} onChange={this.handleChange} /> <br />
                
                <label htmlFor="">Gender : </label>
                <input type="radio" onChange ={this.handleChange} checked = {gender==="male"} name="gender" value={"male"} />Male
                <input type="radio" onChange ={this.handleChange} checked = {gender==="female"} name="gender" value={"female"} />Female
                <input type="radio" onChange ={this.handleChange} checked = {gender==="other"} name="gender" value={"other"} />Other <br />

                <label htmlFor="">Areas Of Interest : </label>
                <input type="checkbox" name="areasOfInterest" onChange ={this.handleChange} value={"HTML"} checked = {areasOfInterest.includes("HTML")} /> HTML
                <input type="checkbox" name="areasOfInterest" onChange ={this.handleChange} value={"CSS"} checked = {areasOfInterest.includes("CSS")} /> CSS
                <input type="checkbox" name="areasOfInterest" onChange ={this.handleChange} value={"JS"} checked = {areasOfInterest.includes("JS")} /> JS
                <input type="checkbox" name="areasOfInterest" onChange ={this.handleChange} value={"REACTJS"} checked = {areasOfInterest.includes("REACTJS")} /> REACTJS
                <input type="checkbox" name="areasOfInterest" onChange ={this.handleChange} value={"BOOTSTRAP"} checked = {areasOfInterest.includes("BOOTSTRAP")} /> BOOTSTRAP <br />

                <label htmlFor="">State : </label>
                <select name="state" value={state} onChange={this.handleChange}>
                    <option value=""></option>
                    <option value="AP">AP</option>
                    <option value="TS">TS</option>
                    <option value="KA">KA</option>
                </select> <br /><br />

                {
                    index === null ? <button type="button" onClick={this.addUser}>Add Details</button>
                    :<button type="button" onClick={this.updateUser}>Update Details</button>
                }
            </form>
        </div> <br />
        <div>
            <table border={2}>
                <thead>
                    <tr>
                        <th>fullname</th>
                        <th>gender</th>
                        <th>ares of Interest</th>
                        <th>state</th>
                        <th>edit</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.users.map((usr,i)=>{
                            return(
                                <tr key={i}>
                                    <td>{usr.fname}</td>
                                    <td>{usr.gender}</td>
                                    <td>{usr.areasOfInterest.join(",")}</td>
                                    <td>{usr.state}</td>
                                    <td>
                                        <button type="button" onClick={()=>{this.editUser(usr,i)}}>edit</button>
                                    </td>
                                    <td>
                                        <button type="button" onClick={()=>{this.deleteUser(usr,i)}}>delete</button>
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

export default HOCcomp(ClassComp01)