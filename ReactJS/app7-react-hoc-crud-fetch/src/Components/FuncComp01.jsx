import React, { useEffect, useState } from 'react'
import HOCFuncComp from './HOCFuncComp'

const FuncComp01 = ({commonServerCommunication,persons}) => {
    const[person,setPerson] = useState({
        fname:""
    })
    const[index,setIndex] = useState(null);

    const handleChange = (e) =>{
        const newPerson = {...person};
        newPerson[e.target.name] = e.target.value;
        setPerson(newPerson);
    }
    const addPerson = () =>{
        commonServerCommunication("POST",person);
        commonServerCommunication("GET");
        setPerson({
            fname:""
        })
    }
    const deleteUser = (per) =>{
        commonServerCommunication("DELETE",per);
        commonServerCommunication("GET");
    }
    const editUser = (per) =>{
        setPerson(per);
        setIndex(per.id)
    }
    const updatePerson = () =>{
        commonServerCommunication("PUT",person);
        setIndex(null);
        commonServerCommunication("GET");
        setPerson({
            fname:""
        })
    }
    // const clearForm = () =>{
    //     setPerson({
    //         fname:""
    //     })
    // }
    useEffect(()=>{
        commonServerCommunication("GET");
    },[])
  return (
    <div>
      <div>
        <form action="">
            <label htmlFor="">Person Name : </label>
            <input type="text" name="fname" value={person.fname} onChange={handleChange} /> <br />

            {
                index === null ? <button type="button" onClick={addPerson}>Add Person</button>
                : <button type="button" onClick={updatePerson}>Update Person</button>
            }
        </form>
      </div> <br /><br />
      <div>
        <table border={2}>
            <thead>
                <tr>
                    <th>Person Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    persons.map((per,i)=>{
                        return(
                            <tr key={i}>
                                <td>{per.fname}</td>
                                <td>
                                    <button type="button" onClick={()=>editUser(per)}>edit</button>
                                </td>
                                <td>
                                    <button type="button" onClick={()=>deleteUser(per,i)}>delete</button>
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

export default HOCFuncComp(FuncComp01)
