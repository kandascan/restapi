import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/headerComponent';
import Body from './components/bodyComponent';
import Footer from './components/footerComponent';

class Root extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Body />
                <Footer />
            </div>
        )
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));