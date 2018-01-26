import React from 'react';
import Jumbotron from './jumbotronComponent';
import Content from './contentComponent';
import SurveyStore from '../stores/AppStore';
import SurveyList from './surveyComponents/surveyListComponent';
import Survey from './surveyComponents/surveyComponent';

export default class Body extends React.Component {
    constructor() {
        super();
        this.state = {
            survey: SurveyStore.getSurveyById(0)
        };
    }
    componentWillMount(){
    }
    createSurvey(){
        console.log("click create button ");
    }

    showDetail(id){
        console.log('click showDetails ID', id);
        this.state = {
            survey: SurveyStore.getSurveyById(id-1)
        }
        console.log(this.state.survey)
        var Sur = <Survey survey={this.state.survey}/>;
    }

    render() {
        var Sur = '';
        return (
            <div>               
                <SurveyList showDetailFunction={this.showDetail.bind(this)}/>
                <button className="btn btn-danger" onClick={this.createSurvey.bind(this)}>Create </button>
                {Sur}
            </div>
        )
    }
}