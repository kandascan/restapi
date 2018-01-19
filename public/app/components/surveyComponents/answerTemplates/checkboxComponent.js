import React from 'react';

export default class CheckBox extends React.Component {
    render() {
        return (
            <div>
                <input type="checkbox" name="multi" value={this.props.item.answer} /> {this.props.item.answer}
            </div>
        )
    }
}