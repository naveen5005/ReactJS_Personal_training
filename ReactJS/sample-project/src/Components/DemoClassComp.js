import { Component } from "react";

export class DisplayHeading extends Component {
    constructor(){
        super();
        this.state={
            msg : "Welcome to the Project - From State Object !!!",
            results : ["apple","ball","car"]
        }
        
    }
    render() {
        return (
            <>
                <h2>Welcome to the Class Component</h2>
                <p>{this.state.msg}</p>
                {console.log(this.state.results)}
            </>
        )
    }
}

