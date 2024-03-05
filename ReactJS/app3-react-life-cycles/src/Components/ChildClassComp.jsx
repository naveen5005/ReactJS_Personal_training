import React, { Component } from 'react'
import ImageClassComp from './ImageClassComp';

export default class ChildClassComp extends Component {
    constructor(){
        console.log("Constructor method called from...!!! child class Component")
        super();
        this.state ={

        }
    }
    static getDerivedStateFromProps(){
        console.log("getDerivedStateFromProps method called from...!!! child class component");
        return null;
    }
    componentDidMount(){
        console.log("componentDidMount method called from...!!! child class component");
    }
    shouldComponentUpdate(){
        console.log("shouldComponentUpdate method called from...!!! child class component");
        return true;
    }
    getSnapshotBeforeUpdate(){
        console.log("getSnapshotBeforeUpdate method is called from...!!! child class component");
        return true;
    }
    componentDidUpdate(){
        console.log("componentDidUpdate method called from...!!! child class component");
    }
    
  render() {
    console.log("render method called from...!!! child class component");
    return (
      <div>
        <h2>Welcome to Child Component : {this.props.count}</h2>
        {this.props.count === 0 && <ImageClassComp/>}
      </div>
    )
  }
}
