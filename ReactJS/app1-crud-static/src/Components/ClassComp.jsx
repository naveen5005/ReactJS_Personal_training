import { Component } from "react";

export default class ClassComp extends Component{
    constructor(){
        super();
        this.state ={
            user : {
                fname : "",
                areasOfInterest : []
            },
            allUsers :[
                {
                    fname : "Naveen",
                    areasOfInterest : ["HTML","CSS","JS","REACTJS"]
                },
                {
                    fname : "Kiran",
                    areasOfInterest :["HTML"]
                },
                {
                    fname : "kavya",
                    areasOfInterest :["HTML","CSS"]
                }
            ],
            index : null
        }
    }

    handleChange = (e) =>{
        const newUser = {...this.state.user};
        if(e.target.name === "areasOfInterest"){
            if(e.target.checked){
                newUser.areasOfInterest.push(e.target.value)
            }else{
                var index = newUser.areasOfInterest.indexOf(e.target.value);
                newUser.areasOfInterest.splice(index,1);
            }
        }else{
            newUser[e.target.name] = e.target.value;
        }
        this.setState({user:newUser})
    }
    addUser = () =>{
        const newUsers = [...this.state.allUsers];
        newUsers.push(this.state.user);
        this.setState({allUsers : newUsers});
    }
    deleteUser = (usr) =>{
        var newUsers = [...this.state.allUsers];
        newUsers = newUsers.filter((data)=>data.fname !== usr.fname);
        this.setState({allUsers : newUsers});
    }
    editUser = (usr,i) =>{
        this.setState({user:usr,index:i});
    }
    updateUser = () =>{
        const newUsers = [...this.state.allUsers];
        newUsers[this.state.index] = this.state.user;
        this.setState({allUsers:newUsers,index:null})
    }
    render()
    {
        const {fname,areasOfInterest} = this.state.user;
        return(
            <div>
                <div>
                    <form action="">
                        <label htmlFor="">FullName : </label>
                        <input type="text" name="fname" value={fname} onChange={this.handleChange}/> <br />
                        <label htmlFor="">Areas Of Ineterst : </label>
                        <input type="checkbox" name="areasOfInterest" onChange={this.handleChange} checked ={areasOfInterest.includes("HTML")} value={"HTML"} /> HTML
                        <input type="checkbox" name="areasOfInterest" onChange={this.handleChange} checked ={areasOfInterest.includes("CSS")} value={"CSS"} /> CSS
                        <input type="checkbox" name="areasOfInterest" onChange={this.handleChange} checked ={areasOfInterest.includes("JS")} value={"JS"} /> JS
                        <input type="checkbox" name="areasOfInterest" onChange={this.handleChange} checked ={areasOfInterest.includes("REACTJS")} value={"REACTJS"} /> REACTJS <br />
                        {
                            this.state.index === null ? <button type="button" onClick={this.addUser}>AddUser</button>
                            :<button type="button" onClick={this.updateUser}>updateUser</button>
                        }
                    </form>
                </div>
                <div>
                    <table border={2}>
                        <thead>
                            <tr>
                                <th>FullName</th>
                                <th>Areas of Interest</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.allUsers.map((usr,i)=>{
                                    return(
                                        <tr key={i}>
                                            <td>{usr.fname}</td>
                                            <td>{usr.areasOfInterest.join(",")}</td>
                                            <td>
                                                <button type="button" onClick={()=>this.editUser(usr,i)}>edit</button>
                                            </td>
                                            <td>
                                                <button type="button" onClick={()=>this.deleteUser(usr)}>delete</button>
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