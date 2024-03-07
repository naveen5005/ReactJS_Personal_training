import React, { useState } from 'react'

const Reusable_Func = ({render}) => {
    const[counter,setCounter] = useState(0);

    const incrementCount = () =>{
        setCounter(counter+1);
    }
    const decrementCount = () =>{
        if(counter > 0){
            setCounter(counter-1);
        }
    }
    const resetCount = () =>{
        setCounter(0);
    }
  return (
    <div>
      {render(counter,incrementCount,decrementCount,resetCount)}
    </div>
  )
}

export default Reusable_Func
