import React from 'react';
import SurveyStore from '../stores/AppStore';
import SurveyList from './surveyComponents/surveyListComponent';

export default class Body extends React.Component {
    constructor() {
        super();
        this.state = {
            survey: SurveyStore.getSurveyById(1)// tu niemoze byc taki hardcoding
        };
    }

    showDetail(id){
        this.setState = {
            survey: SurveyStore.getSurveyById(id)
        }
        console.log(this.state.survey);
    }

    render() {
        return (
            <div>      
                <h1>{this.state.survey.id}</h1>
                <SurveyList showDetailFunction={this.showDetail.bind(this)}/>
            </div>
        )
    }
}