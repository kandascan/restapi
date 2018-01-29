import React from 'react';
import Header from './headerComponent';
import Body from './bodyComponent';
import Footer from './footerComponent';

export default class Layout extends React.Component {
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