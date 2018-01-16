import React from 'react';
import Jumbotron from './jumbotronComponent';
import Content from './contentComponent';

export default class Body extends React.Component {
    render() {
        return (
            <div>
                <Jumbotron />
                <Content />
            </div>
        )
    }
}