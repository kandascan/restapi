import React from 'react';

export default class RadioButton extends React.Component {
    render() {
        return (
            <div className="input-group">
                <span className="input-group-addon">
                    <input type="radio" name="single" value={this.props.item.answer} />
                </span>
                <label className="form-control">{this.props.item.answer}</label>
            </div>
        )
    }
}