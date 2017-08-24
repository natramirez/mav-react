import React, { Component } from 'react';
import { Line } from 'rc-progress';

class ProgressBar extends Component {
  render() {   
    return (
        <div className="progress-bar">
            <Line percent={this.props.percent} strokeColor="#4286f4" />
            <span>{this.props.percent}% completado</span>
        </div>
    )
  }
}

export default ProgressBar;