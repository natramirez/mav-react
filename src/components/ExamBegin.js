import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ExamBegin extends Component {
    render() {
        return (
            <div className="exam-content">
                <Link to={this.props.match.path+"/en_proceso"}>COMENZAR EXAMEN</Link>
            </div>
        );
    }
}

export default ExamBegin;