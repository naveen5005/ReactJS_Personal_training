import React, { useEffect } from 'react'

const Subject = () => {
    useEffect(()=>{
        getSubjectContent()
    },[])
    const getSubjectContent=async()=>{
      const response = await (await fetch("http://localhost:3000/HTML")).json();
      console.log(response)
    }
  return (
    <div>
      
    </div>
  )
}

export default Subject
