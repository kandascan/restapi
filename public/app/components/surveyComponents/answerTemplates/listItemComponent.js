import React from 'react';

export default class ListItem extends React.Component {
    render() {
        return (
            <option className="dropdown-item" value={this.props.item.answer}>{this.props.item.answer}</option>
        )
    }
}