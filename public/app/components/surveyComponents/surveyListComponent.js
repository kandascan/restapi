import React from 'react';
import Survey from './surveyComponent';

export default class SurveyList extends React.Component {

    render() {
        console.log(this.props.survey);
        return (
            <tr>
                <th scope="row">{this.props.survey.id}</th>
                <td>{this.props.survey.header}</td>
                <td>{this.props.survey.questions.length}</td>
                <td><input type="checkbox" defaultChecked={this.props.survey.public} disabled/></td>
            </tr>
        )
    }
}