import React from 'react'
import Content from './Content'

const ChildComp = ({msg}) => {
  return (
    <div>
      <Content msg = {msg}/>
    </div>
  )
}

export default ChildComp
