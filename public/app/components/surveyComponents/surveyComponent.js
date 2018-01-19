import React from 'react';
import Question from './questionComponent'

export default class Survey extends React.Component {
    render() {
        var questions = this.props.survey.questions;
        questions = questions.map((item, index) => {
            return (
                <Question item={item} key={item.id} />
            )
        });
        return (
            <div>
                <div className="alert alert-info" role="alert">
                    <h2>{this.props.survey.header}</h2>
                </div>
                {questions}
            </div>
        )
    }
}