import React from 'react'
import { useSelector } from "react-redux";

const Students = (props) => {
  console.log(props)
    useSelector((state)=>{
        console.log(state);
        return state.students
    })
  return (
    <div>
      student
    </div>
  )
}

export default Students
