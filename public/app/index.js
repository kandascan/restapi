import React from 'react';
import ReactDOM from 'react-dom';

class Root extends React.Component {
    render() {
        return (
            <div>
                <h1>React code</h1>
                <h4>finally it works</h4>
            </div>
        )
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));