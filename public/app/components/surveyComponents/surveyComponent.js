import React from 'react';
import Question from './questionComponent'
import SurveyStore from '../../stores/AppStore';

export default class Survey extends React.Component {
    constructor() {
        super();
        this.state = {
            survey: SurveyStore.getSurveyById(1),// tu niemoze byc taki hardcoding
            index: 0
        };
    }
    componentWillMount(){
        var questions = this.state.survey.questions;
        this.setState({question: questions[0], index: 0})
    }
    render() {
        var questions = this.state.survey.questions;
        var counter = this.state.index;
        var nextQuestion = () => {
            if(counter <= questions.length-2)
            {
                counter++;
                this.setState({
                    question: questions[counter],
                    index: counter
                });
            }           
        }

        var previousQuestion = () => {
            if(counter> 0){
                counter--;
                this.setState({
                    question: questions[counter],
                    index: counter
                });
            }
        }

        return (
            <div>
                <div className="alert alert-info" role="alert">
                    <h2>{this.state.survey.header}</h2>
                </div>
                <Question item={this.state.question} />
                <div>
                    <br />
                    <button onClick={previousQuestion} className="btn btn-info">Back</button>
                    <span> </span>
                    <button onClick={nextQuestion} className="btn btn-success">Next</button>
                </div>
            </div>
        )
    }
}