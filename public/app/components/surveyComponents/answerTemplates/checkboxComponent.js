import React from 'react';

export default class CheckBox extends React.Component {
    render() {
        return (
            <div className="input-group">
                <span className="input-group-addon">
                    <input type="checkbox" value={this.props.item.answer} />
                </span>
                <label className="form-control">{this.props.item.answer}</label>
            </div>
        )
    }
}