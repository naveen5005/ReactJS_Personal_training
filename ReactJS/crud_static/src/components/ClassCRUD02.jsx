import React, { Component } from 'react'
import '../Styles/classCRUD01.css'
export default class ClassCRUD02 extends Component {
    constructor() {
        super();
        this.state = {
            person: {
                fname: "",
                gender: "",
                areasOfInterest: [],
                state: ""
            },
            persons: [
                {
                    fname: "Naveen",
                    gender: "Male",
                    areasOfInterest: ["HTML"],
                    state: ""
                },
                {
                    fname: "Kavya",
                    gender: "Female",
                    areasOfInterest: ["CSS"],
                    state: "AP"
                },
                {
                    fname: "OTHER",
                    gender: "Other",
                    areasOfInterest: ["CSS", "JS", "REACTJS"],
                    state: "TS"
                }
            ],
            isEdit: null,
            abc: []
        }
    }
    handleChange = (e) => {
        // console.log(e)
        const newPerson = { ...this.state.person }
        if (e.target.name === "areasOfInterest") {
            if (e.target.checked) {
                newPerson.areasOfInterest.push(e.target.value);
            }
            else {
                const index = newPerson.areasOfInterest.indexOf(e.target.value);
                if (index !== -1) {
                    newPerson.areasOfInterest.splice(index, 1);
                }
            }
        }
        else if (e.target.name === "state") {
            e.target.childNodes.forEach((opt) => {
                if (opt.selected) {
                    newPerson[e.target.name] = opt.value
                }
            })
        }
        else {
            newPerson[e.target.name] = e.target.value;
        }
        this.setState({ person: newPerson })
    }
    addPerson = () => {
        const newPersons = [...this.state.persons];
        newPersons.push(this.state.person);
        this.setState({ persons: newPersons });
        this.clearForm();
    }
    clearForm = () => {
        // const clearValues = {
        //     fname:"",
        //     gender:""
        // }
        // this.setState({person : clearValues})

        // this.setState({
        //     fname :"",
        //     gender :""
        // })
        this.setState({
            person: {
                fname: "",
                gender: "",
                areasOfInterest: [],
                state: ""
            }
        })
    }
    deletePerson = (person, i) => {
        const newPersons = [...this.state.persons];
        newPersons.splice(i, 1);
        this.setState({ persons: newPersons })
    }
    editPerson = (per, i) => {
        this.setState({ person: per, isEdit: i })
    }
    updatePerson = () => {
        const newPersons = [...this.state.persons];
        newPersons[this.state.isEdit] = this.state.person;
        this.setState({ persons: newPersons, isEdit: null });
        this.clearForm();
    }
        selectedObjects = (per, i) => {
            if (this.state.abc.length === 0) {
                this.state.abc.push(per);
            } else {
                const index = this.state.abc.indexOf(per);
                index !== -1 ? this.state.abc.splice(index, 1) : this.state.abc.push(per);
            }
            console.log(this.state.abc)
        }
    deleteAll = () => {
        let newPersons = [...this.state.persons]
        const deleteNames = this.state.abc.map(data => JSON.stringify(data));
        newPersons =newPersons.filter((data) =>!deleteNames.includes(JSON.stringify(data)));
        this.setState({ persons: newPersons,abc:[] })
    }
    checkObjectExist=(person)=>{
        console.log(person)
        return this.state.abc.find((p)=>p.fname === person.fname)
    }
    render() {
        return (
            <div className='mainContainer'>
                <div className="formDisplay">
                    <form action="">
                        <label htmlFor="">Name : </label>
                        <input type="text" name="fname" value={this.state.person.fname} onChange={this.handleChange} /> <br />

                        <label htmlFor="">Gender : </label>
                        <input type="radio" name="gender" value="Male" onChange={this.handleChange} checked={this.state.person.gender === "Male"} /> Male
                        <input type="radio" name="gender" value="Female" onChange={this.handleChange} checked={this.state.person.gender === "Female"} /> Female
                        <input type="radio" name="gender" value="Other" onChange={this.handleChange} checked={this.state.person.gender === "Other"} /> Other <br />

                        <label htmlFor="">Areas Of Interest : </label>
                        <input type="checkbox" name="areasOfInterest" onChange={this.handleChange} checked={this.state.person.areasOfInterest.includes("HTML")} value="HTML" /> HTML
                        <input type="checkbox" name="areasOfInterest" onChange={this.handleChange} checked={this.state.person.areasOfInterest.includes("CSS")} value="CSS" /> CSS
                        <input type="checkbox" name="areasOfInterest" onChange={this.handleChange} checked={this.state.person.areasOfInterest.includes("JS")} value="JS" /> JS
                        <input type="checkbox" name="areasOfInterest" onChange={this.handleChange} checked={this.state.person.areasOfInterest.includes("REACTJS")} value="REACTJS" /> REACTJS <br />

                        <label htmlFor="">State : </label>
                        <select name="state" value={this.state.person.state} onChange={this.handleChange}>
                            <option value=""></option>
                            <option value="AP">AP</option>
                            <option value="TS">TS</option>
                        </select> <br />

                        {this.state.isEdit === null ? <button type="button" className='addUpdateStyle' onClick={this.addPerson}>Add Person</button>
                            : <button type="button" className='addUpdateStyle' onClick={this.updatePerson}>Update Person</button>}
                    </form>
                </div>
                <div className="tableDisplay">
                    <button type="button" onClick={this.deleteAll}>Delete All</button> <br /><br />
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>fullName</th>
                                <th>gender</th>
                                <th>areasOfInterest</th>
                                <th>state</th>
                                <th>edit</th>
                                <th>delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.persons.map((per, i) => {
                                return (
                                    <tr key={i}>
                                        <td><input type="checkbox" checked = {this.checkObjectExist(per)} onClick={() => this.selectedObjects(per, i)} /></td>
                                        <td>{per.fname}</td>
                                        <td>{per.gender}</td>
                                        <td>{per.areasOfInterest.join(", ")}</td>
                                        <th>{per.state}</th>
                                        <td>
                                            <button type="button" onClick={() => this.editPerson(per, i)}>edit</button>
                                        </td>
                                        <td>
                                            <button type="button" onClick={() => this.deletePerson(per, i)}>delete</button>
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
