import React from 'react';

export default class RadioButton extends React.Component {
    render() {
        return (
            <div>
                <input type="radio" name="single" value={this.props.item.answer} /> {this.props.item.answer}
            </div>
        )
    }
}