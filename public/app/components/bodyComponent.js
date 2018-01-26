import React from 'react';
import Jumbotron from './jumbotronComponent';
import Content from './contentComponent';
import SurveyStore from '../stores/AppStore';
import SurveyList from './surveyComponents/surveyListComponent';

export default class Body extends React.Component {
    constructor() {
        super();
        this.state = {
            surveys: SurveyStore.getAll(),
        };
    }
    render() {
        const { surveys } = this.state;
        const Surveys = surveys.map((item) => {
            return <SurveyList key={item.id} survey={item} />
        });
        return (
            <div>
                <table className="table">
                    <thead className="table-success">
                        <tr>
                            <th>#</th>
                            <th>Header</th>
                            <th>Questions</th>
                            <th>Public</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Surveys}
                    </tbody>
                </table>
            </div>
        )
    }
}