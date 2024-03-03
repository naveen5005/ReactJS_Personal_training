import React from "react";
import { useState } from "react";

const UserFormFunc = () => {
  const [person, setPerson] = useState({
    fname: "",
    lname: "",
  }); // useState Hook . Provided by ReactJS (From Version 16);

  const [persons, setPersons] = useState([
    { fname: "ss", lname: "DD" },
    { fname: "ss1", lname: "DD1" },
    { fname: "ss2", lname: "DD2" },
  ]);
  const [rowIndex, setRowIndex] = useState(null);
  const handleChange = (e) => {
    // creating a Copy Of Person
    const newPerson = { ...person };
    newPerson[e.target.name] = e.target.value;
    setPerson(newPerson);
  };

  const handleSubmit = () => {
    const newPersons = [...persons];
    newPersons.push(person);
    setPersons(newPersons); // asyncronous
    clearPerson();
  };
  const handleDelete = (usr, i) => {
    console.log(i);
    // 1. SPlice method can be used to Delte a value in an Array
    // const newPersons = [...persons];
    // newPersons.splice(i,1);
    // setPersons(newPersons)

    // 2. Using Filter Method
    setPersons(
      persons.filter((user) => {
        return user.fname !== usr.fname;
      })
    );
  };
  const handleEdit = (usr, i) => {
    setPerson(usr);
    setRowIndex(i);
  };
  const handleUpdate = () => {
    const newPersons = [...persons];
    newPersons[rowIndex] = person;
    setPersons(newPersons);
    setRowIndex(null);
    clearPerson();
  };
  const clearPerson = () => {
    setPerson({
      fname: "",
      lname: "",
    });
  };
  return (
    <div>
      <form>
        <label htmlFor="">First Name : </label>
        <input
          type="text"
          name="fname"
          value={person.fname}
          onChange={handleChange}
          id="fname"
        />{" "}
        <br />
        <label htmlFor="lname">Last Name : </label>
        <input
          type="text"
          name="lname"
          value={person.lname}
          onChange={handleChange}
        />{" "}
        <br />
        {rowIndex !== null ? (
          <button onClick={handleUpdate} type="button">
            Update User
          </button>
        ) : (
          <button onClick={handleSubmit} type="button">
            Add User
          </button>
        )}
      </form>
      <hr />
      <table border={1}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((usr, i) => {
            return (
              <tr key={i}>
                <td>{usr.fname}</td>
                <td>{usr.lname}</td>
                <td>
                  <button
                    onClick={() => {
                      handleEdit(usr, i);
                    }}
                  >
                    Edit User
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(usr, i);
                    }}
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserFormFunc;
