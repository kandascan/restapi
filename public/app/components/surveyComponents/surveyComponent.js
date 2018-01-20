import React from 'react';
import Question from './questionComponent'

export default class Survey extends React.Component {
    constructor() {
        super();
        
        this.state ={ };
    }
    componentWillMount(){
        var questions = this.props.survey.questions;
        this.setState({question: questions[0], index: 0})
    }
    render() {
        // questions = questions.map((item, index) => {
        //     return (
        //         <Question item={item} key={item.id} />
        //     )
        // });      
        var questions = this.props.survey.questions;
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
                    <h2>{this.props.survey.header}</h2>
                </div>
                {/* {questions} */}
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