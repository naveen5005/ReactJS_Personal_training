import React from 'react'
import ChildComp from './ChildComp'

const ParentComp = ({msg}) => {
  return (
    <div>
      <ChildComp msg={msg}/>
    </div>
  )
}

export default ParentComp
