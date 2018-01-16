import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/headerComponent';
import Body from './components/bodyComponent';

class Root extends React.Component {
    render() {
        return (
            <div className="container">
                <Header />
                <Body />
            </div>
        )
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));