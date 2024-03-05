import React, { useState } from 'react'
import '../Styles/classCRUD01.css'

const FuncCRUD02 = () => {
    const[person,setPerson] = useState({
        fname : "",
        gender : "",
        areasOfInterest : [],
        state : ""
    })
    const[allPersons,setAllPersons] = useState([
        {
            fname : "naveen",
            gender :"male",
            areasOfInterest : ["HTML","CSS"],
            state : "AP"
        },
        {
            fname : "kavya",
            gender :"female",
            areasOfInterest : ["HTML","CSS","JS","REACTJS"],
            state : "TS"
        },
        {
            fname : "kiran",
            gender :"male",
            areasOfInterest : ["HTML"],
            state : "AP"
        }
    ])
const[index,setIndex] = useState(null);

    const handleChange = (e) => {
        const newPerson = {...person};
        if(e.target.name === "areasOfInterest"){
            if(e.target.checked){
                newPerson.areasOfInterest.push(e.target.value);
            }
            else{
                const index = newPerson.areasOfInterest.indexOf(e.target.value);
                if(index !== -1){
                    newPerson.areasOfInterest.splice(index,1);
                }
            }
        }
        else if(e.target.name === "state"){
            e.target.childNodes.forEach((opt)=>{
                if (opt.selected) {
                    newPerson[e.target.name] = opt.value
                }
            })
        }
        else{
            newPerson[e.target.name] = e.target.value;
        }
        setPerson(newPerson)
    }

    const addPerson = () =>{
        const newPersons = [...allPersons];
        newPersons.push(person);
        setAllPersons(newPersons);
        clearForm()
    }
    const clearForm = () =>{
        setPerson({
            fname :"",
            gender :"",
            areasOfInterest :[],
            state :""
        })
    }
    const deletePerson = (per,i) =>{
        const newPersons = [...allPersons];
        newPersons.splice(i,1);
        setAllPersons(newPersons);
    }
    const editPerson = (per,i) =>{
        setPerson(per);
        setIndex(i);
    }
    const updatePerson = () => {
        const newPersons = [...allPersons];
        newPersons[index] = person;
        setAllPersons(newPersons);
        setIndex(null);
        clearForm();
    }
  return (
    <div className='mainContainer'>
      <div className="formDisplay">
        <form action="">
            <label htmlFor="">fullName : </label>
            <input type="text" name="fname" value={person.fname} onChange={handleChange} /> <br />

            <label htmlFor="">gender : </label>
            <input type="radio" name="gender" value={"male"} onChange={handleChange} checked = {person.gender === "male"} />Male
            <input type="radio" name="gender" value={"female"} onChange={handleChange} checked = {person.gender === "female"} />Female
            <input type="radio" name="gender" value={"other"} onChange={handleChange} checked = {person.gender === "other"} />Other <br />

            <label htmlFor="">areas Of Interest :</label>
            <input type="checkbox" onChange={handleChange} checked = {person.areasOfInterest.includes("HTML")} name="areasOfInterest" value={"HTML"} /> HTML
            <input type="checkbox" onChange={handleChange} checked = {person.areasOfInterest.includes("CSS")} name="areasOfInterest" value={"CSS"} /> CSS
            <input type="checkbox" onChange={handleChange} checked = {person.areasOfInterest.includes("JS")} name="areasOfInterest" value={"JS"} /> JS
            <input type="checkbox" onChange={handleChange} checked = {person.areasOfInterest.includes("REACTJS")} name="areasOfInterest" value={"REACTJS"} /> REACTJS <br />

            <label htmlFor="">state : </label>
            <select name="state" value={person.state} onChange={handleChange}>
                <option value=""></option>
                <option value="AP">AP</option>
                <option value="TS">TS</option>
            </select> <br />

            {index === null ? <button className='addUpdateStyle' type="button" onClick={addPerson}>Add Person</button>
            : <button className='addUpdateStyle' type="button" onClick={updatePerson}>Update Person</button>}
        </form>
      </div>
      <div className="tableDisplay">
        <table>
            <thead>
                <tr>
                    <th>fullName</th>
                    <th>gender</th>
                    <th>araesOfInterest</th>
                    <th>state</th>
                    <th>edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {allPersons.map((per,i)=>{
                    return(
                        <tr key={i}>
                            <td>{per.fname}</td>
                            <td>{per.gender}</td>
                            <td>{per.areasOfInterest}</td>
                            <td>{per.state}</td>
                            <td>
                                <button type="button" onClick={()=>editPerson(per,i)}>edit</button>
                            </td>
                            <td>
                                <button type="button" onClick={()=>deletePerson(per,i)}>delete</button>
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

export default FuncCRUD02
