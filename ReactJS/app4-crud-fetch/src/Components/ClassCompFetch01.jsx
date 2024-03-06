import React, { Component } from 'react'

export default class ClassCompFetch01 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                fname: "",
                gender: "",
                areasOfInterest: [],
                state: ""
            },
            users: [],
            updateIndex : null
        }
    }

    handleChange = (e) => {
        const newUser = { ...this.state.user };
        if (e.target.name === "areasOfInterest") {
            if (e.target.checked) {
                newUser.areasOfInterest.push(e.target.value);
            } else {
                const index = newUser.areasOfInterest.indexOf(e.target.value);
                if (index !== -1) {
                    newUser.areasOfInterest.splice(index, 1);
                }
            }
        }
        else if (e.target.name === "state") {
            e.target.childNodes.forEach((opt) => {
                if (opt.selected) {
                    newUser[e.target.name] = opt.value
                }
            })
        }
        else {
            newUser[e.target.name] = e.target.value;
        }
        this.setState({ user: newUser });
    }
    componentDidMount() {
        this.commonServerCommunication("GET");
    }
    addUser = () => {
        const newUser = { ...this.state.user };
        this.commonServerCommunication("POST", newUser);
        this.componentDidMount();
        this.clearForm();
    }
    clearForm = () =>{
        var clearValues ={
            fname : "",
            gender:"",
            areasOfInterest :[],
            state : "" 
        }
        this.setState({user : clearValues})
    }
    deleteUser = (usr) =>{
        this.commonServerCommunication("DELETE",usr);
        this.componentDidMount();
    }
    editUser = (usr) =>{
        this.setState({user:usr,updateIndex:usr.id});
    }
    updateUser = () =>{
        const newUser = {...this.state.user};
        this.commonServerCommunication("PUT",newUser);
        this.setState({updateIndex:null});
        this.clearForm();
        this.componentDidMount();
    }
    commonServerCommunication = async (method, payload) => {
        let url = "";
        method === "POST" || method === "GET" ? url = "http://localhost:3001/users" : url = "http://localhost:3001/users/" + payload.id
        var results = await (await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: method === "POST" || method === "PUT" ? JSON.stringify(payload) : null
        })).json()
        if (method === "GET") {
            this.setState({ users: results });
        }
    }

    render() {
        return (
            <div>
                <div>
                    <form action="">
                        <label htmlFor="">fullName : </label>
                        <input type="text" name="fname" value={this.state.user.fname} onChange={this.handleChange} /> <br />

                        <label htmlFor="">gender : </label>
                        <input type="radio" name="gender" onChange={this.handleChange} checked={this.state.user.gender === "male"} value={"male"} />male
                        <input type="radio" name="gender" onChange={this.handleChange} checked={this.state.user.gender === "female"} value={"female"} />female
                        <input type="radio" name="gender" onChange={this.handleChange} checked={this.state.user.gender === "Other"} value={"Other"} />other <br />

                        <label htmlFor="">areasOfInterest : </label>
                        <input type="checkbox" name="areasOfInterest" checked={this.state.user.areasOfInterest.includes("HTML")} onChange={this.handleChange} value={"HTML"} /> HTML
                        <input type="checkbox" name="areasOfInterest" checked={this.state.user.areasOfInterest.includes("CSS")} onChange={this.handleChange} value={"CSS"} /> CSS
                        <input type="checkbox" name="areasOfInterest" checked={this.state.user.areasOfInterest.includes("JS")} onChange={this.handleChange} value={"JS"} /> JS
                        <input type="checkbox" name="areasOfInterest" checked={this.state.user.areasOfInterest.includes("REACTJS")} onChange={this.handleChange} value={"REACTJS"} /> REACTJS <br />

                        <label htmlFor="">State : </label>
                        <select name="state" value={this.state.user.state} onChange={this.handleChange}>
                            <option value=""></option>
                            <option value="AP">AP</option>
                            <option value="TS">TS</option>
                        </select> <br />
                        {this.state.updateIndex === null ?
                        <button type="button" onClick={this.addUser}>Add User</button> :
                        <button type="button" onClick={this.updateUser}>Update User</button>}
                    </form>
                </div> <br /><br />
                <div>
                    <table border={2}>
                        <thead>
                            <tr>
                                <th>fullname</th>
                                <th>gender</th>
                                <th>areasOfInterest</th>
                                <th>state</th>
                                <th>edit</th>
                                <th>delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map((usr, i) => {
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
