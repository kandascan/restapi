import React from 'react';

export default class SurveyRow extends React.Component {
    handlerClickHeader(){
        console.log('ID: ', this.props.survey.id);
        this.props.detail(this.props.survey.id);
    }
    render() {
        return (
            <tr>
                <th ref={this.props.survey.id} scope="row">{this.props.survey.id}</th>
                <td onClick={this.handlerClickHeader.bind(this)}>{this.props.survey.header}</td>
                <td>{this.props.survey.questions.length}</td>
                <td><input type="checkbox" defaultChecked={this.props.survey.public} disabled/></td>
            </tr>
        )
    }
}