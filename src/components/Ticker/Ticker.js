import * as React from "react";
import { addTickListener, removeTickListener } from "./tick";

export class Ticker extends React.Component {
  tick = () => {
    this.forceUpdate();
  };

  componentDidMount() {
    addTickListener(this.props.tickRate, this.tick);
  }

  componentWillUnmount() {
    removeTickListener(this.props.tickRate, this.tick);
  }

  render() {
    return this.props.children();
  }
}
