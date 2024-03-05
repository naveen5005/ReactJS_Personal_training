import React, { Component } from 'react'

export default class ImageClassComp extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }
    componentWillUnmount(){
        console.log("componentWillUnmount method is called...!!! from Image Class Component")
    }
  render() {
    return (
      <div>
        <img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" alt="" />
      </div>
    )
  }
}
