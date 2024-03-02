import { Component } from "react";

export class NaveenClassComp extends Component {
  constructor() {
    super();
    this.state = {
      msg: "Welcome TO ReactJS Component !!! - From State Object !!!",
    };
  }
  render() {
    return <h2>{this.state.msg}</h2>;
  }
}
