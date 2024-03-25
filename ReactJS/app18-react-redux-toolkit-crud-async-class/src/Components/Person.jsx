import React, { Component } from 'react'
import { connect } from "react-redux";
import { handleCreatePersonAsync, handleDeletePersonAsync, handleGetPersonAsync, handleUpdatePersonAsync } from '../Store/personSlicer';

class Person extends Component {
    constructor(props) {
        super(props)
        this.state = {
            person: {
                fname: "",
                gender: "",
                areasOfInterest: [],
                state: ""
            },
            index: null
        } 
    }

    handleChange = (e) => {
        const newPerson = { ...this.state.person };
        if (e.target.name === "areasOfInterest") {
            let updatedAreasOfInterest = [...newPerson.areasOfInterest];
            if (e.target.checked) {
                updatedAreasOfInterest.push(e.target.value);
            } else {
                const index = updatedAreasOfInterest.indexOf(e.target.value);
                updatedAreasOfInterest.splice(index, 1);
            }
            newPerson.areasOfInterest = updatedAreasOfInterest;
        } else {
            newPerson[e.target.name] = e.target.value;
        }
        this.setState({ person: newPerson })
    }
    handleAddPerson = () => {
        const { person } = this.state;
        const { dispatch } = this.props;
        dispatch(handleCreatePersonAsync(person));
        this.getPersonDetails();
        this.clearFormValues();
    }
    handleDeletePerson = (per) => {
        this.props.dispatch(handleDeletePersonAsync(per));
        this.getPersonDetails();
    }
    handleEditPerson = (per) => {
        this.setState({ person: per });
        this.setState({ index: per.id });
    }
    handleUpdatePerson = () => {
        const { person } = this.state;
        this.props.dispatch(handleUpdatePersonAsync(person));
        this.getPersonDetails();
        this.setState({ index: null });
        this.clearFormValues();
    }
    clearFormValues = () => {
        this.setState({
            person: {
                fname: "",
                gender: "",
                areasOfInterest: [],
                state: ""
            }
        })
    }
    getPersonDetails = () => {
        this.props.dispatch(handleGetPersonAsync());
    }
    componentDidMount() {
        this.getPersonDetails();
    }
    render() {
        const { persons } = this.props;
        const { fname, gender, areasOfInterest, state } = this.state.person;
        const { index } = this.state;
        return (
            <div className='mainContainer'>
                <div className="formBuilder">
                    <form action="">
                        <label htmlFor="">FullName : </label>
                        <input type="text" name="fname" value={fname} onChange={this.handleChange} /> <br />
                        <label htmlFor="">Gender : </label>
                        <input type="radio" name="gender" value={"male"} onChange={this.handleChange} checked={gender === "male"} /> Male
                        <input type="radio" name="gender" value={"female"} onChange={this.handleChange} checked={gender === "female"} /> Female
                        <input type="radio" name="gender" value={"other"} onChange={this.handleChange} checked={gender === "other"} /> Other <br />
                        <label htmlFor="">Areas Of Interest : </label>
                        <input type="checkbox" name="areasOfInterest" value={"HTML"} onChange={this.handleChange} checked={areasOfInterest.includes("HTML")} /> HTML
                        <input type="checkbox" name="areasOfInterest" value={"CSS"} onChange={this.handleChange} checked={areasOfInterest.includes("CSS")} /> CSS
                        <input type="checkbox" name="areasOfInterest" value={"JS"} onChange={this.handleChange} checked={areasOfInterest.includes("JS")} /> JS
                        <input type="checkbox" name="areasOfInterest" value={"REACTJS"} onChange={this.handleChange} checked={areasOfInterest.includes("REACTJS")} /> REACTJS
                        <input type="checkbox" name="areasOfInterest" value={"BOOTSTARP"} onChange={this.handleChange} checked={areasOfInterest.includes("BOOTSTARP")} /> BOOTSTARP <br />
                        <label htmlFor="">State : </label>
                        <select name="state" value={state} onChange={this.handleChange}>
                            <option value=""></option>
                            <option value="TS">TS</option>
                            <option value="AP">AP</option>
                            <option value="KA">KA</option>
                        </select> <br />
                        {
                            index === null ? <button type="button" onClick={this.handleAddPerson}>Add Person</button> :
                                <button type="button" onClick={this.handleUpdatePerson}>Update Person</button>
                        }
                    </form>
                </div>
                <div className="tableBuilder">
                    <table border={2}>
                        <thead>
                            <tr>
                                <th>FullName</th>
                                <th>Gender</th>
                                <th>Areas Of Interest</th>
                                <th>State</th>
                                <th>EDIT</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                persons.map((per, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{per.fname}</td>
                                            <td>{per.gender}</td>
                                            <td>{per.areasOfInterest.join(", ")}</td>
                                            <td>{per.state}</td>
                                            <td>
                                                <button type="button" onClick={() => this.handleEditPerson(per)}>edit</button>
                                            </td>
                                            <td>
                                                <button type="button" onClick={() => this.handleDeletePerson(per, i)}>delete</button>
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

function mapStateToProps(state) {
    return {
        persons: state.persons
    }
}

export default connect(mapStateToProps)(Person)