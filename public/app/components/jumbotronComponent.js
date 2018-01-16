import React from 'react';

export default class Jumbotron extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <h6 className="display-3">MERN - Stack</h6>
                <p className="lead">MERN - MongoDB using (mongoose), Express, React with Flux, Node.js as API.</p>
            </div>
        )
    }
}