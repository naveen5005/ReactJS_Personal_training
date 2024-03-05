import { Component } from "react";
import ChildClassComp from "./ChildClassComp";

export default class ParentClassComp extends Component {
    constructor(){
        super()
        this.state = {
            count:0
        }
        console.log("constructor method called....!!! from Parent Class Component");
    }
    static getDerivedStateFromProps(){
        console.log("getDerivedStateFromProps method called...!!! from Parent Class Component");
        return null;
    }
    componentDidMount(){
        console.log("componentDidMount method called...!!! from Parent Class Component");
    }
    handleCount = () =>{
        this.setState({count:this.state.count+10});
    }
    render(){
        console.log("render method called...!!! from Parent Class Component");
        return(
            <div>
                <h2>Welcome to the Parent Class Component</h2>
                <button type="button" onClick={this.handleCount}>Click me</button> <hr />
                <ChildClassComp count={this.state.count}/>
            </div>
        )
    }
}

