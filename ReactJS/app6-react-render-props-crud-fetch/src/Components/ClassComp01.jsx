import React, { Component } from 'react'

export default class ClassComp01 extends Component {
    constructor(props) {
        super(props)
        // console.log(this.props.commonServerCommunication("POST","naveen"))
        this.state = {
            person: {
                fname: "",
                salary: ""
            },
            index : null
        }
    }

    handleChange = (e) => {
        const newPerson = { ...this.state.person };
        newPerson[e.target.name] = e.target.value;
        this.setState({ person: newPerson });
    }

    addPersonDetails = () => {
        this.props.commonServerCommunication("POST", this.state.person);
        this.clearForm();
        this.componentDidMount();
    }

    componentDidMount() {
        this.props.commonServerCommunication("GET");
    }
    deletePerson = (per) => {
        this.props.commonServerCommunication("DELETE", per);
        this.componentDidMount();
    }
    editPerson = (per) => {
        this.setState({person : per});
        this.setState({index : per.id})
    }
    updatePersonDetails = () =>{
        this.props.commonServerCommunication("PUT",this.state.person);
        this.setState({index : null});
        this.clearForm();
        this.componentDidMount();

    }
    clearForm = () =>{
        this.setState({person : {
            fname : "",
            salary : ""
        }})
    }
    render() {
        const { person,index } = this.state;
        const { persons } = this.props;
        return (
            <div>
                <div>
                    <form action="">
                        <label htmlFor="">Emp Name : </label>
                        <input type="text" name="fname" value={person.fname} onChange={this.handleChange} /> <br />
                        <label htmlFor="">Emp Salary : </label>
                        <input type="text" name="salary" value={person.salary} onChange={this.handleChange} /> <br />
                        {
                            index === null ? <button type="button" onClick={this.addPersonDetails}>Add Details</button>
                            : <button type="button" onClick={this.updatePersonDetails}>Update Details</button>
                        }
                    </form>
                </div> <br /><br />
                <div>
                    <table border={2}>
                        <thead>
                            <tr>
                                <th>Emp Person</th>
                                <th>Emp Salary</th>
                                <th>edit</th>
                                <th>delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                persons.map((per, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{per.fname}</td>
                                            <td>{per.salary}</td>
                                            <td>
                                                <button type="button" onClick={()=>{this.editPerson(per,i)}}>edit</button>
                                            </td>
                                            <td>
                                                <button type="button" onClick={() => { this.deletePerson(per, i) }}>delete</button>
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
