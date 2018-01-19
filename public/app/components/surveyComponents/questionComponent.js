import React from 'react';
import RadioButton from './answerTemplates/radiobuttonComponent';
import CheckBox from './answerTemplates/checkboxComponent';
import DropDownList from './answerTemplates/dropdownlistComponent';

export default class Question extends React.Component {
    render() {
        let template = this.props.item.template;
        let answers = this.props.item.answers;

        if (template === 'radiobutton') {
            answers = answers.map(function (a, i) {
                return <RadioButton item={a} key={a.id} />
            })
        }
        else if (template === 'checkbox') {
            answers = answers.map(function (a, i) {
                return <CheckBox item={a} key={a.id} />
            })
        }
        else if (template === 'dropdownlist') {
            answers = <DropDownList items={answers} />
        }

        return (
            <div>
                <div className="alert alert-success" role="alert">
                    <h5>{this.props.item.id}. {this.props.item.title}</h5>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        {answers}
                    </div>
                </div>
            </div>
        )
    }
}