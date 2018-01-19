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
                <h1>{this.props.survey.header}</h1>
                <ul>
                    {questions}
                </ul>
            </div>
        )
    }
}