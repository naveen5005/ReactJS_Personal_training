import React, { useState } from 'react'
import ParentComp from './ParentComp'

const MainComp = () => {
    const[msg,setMsg] = useState("naveen")
  return (
    <div>
      <h2>Welcome to Main function component</h2>
      <ParentComp msg={msg}/>
    </div>
  )
}

export default MainComp
