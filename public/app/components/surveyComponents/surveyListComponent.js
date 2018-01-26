import React from 'react';
import SurveyStore from '../../stores/AppStore';
import SurveyAction from '../../actions/AppActions';
import SurveyRow from './surveyRowComponent';
import Survey from './surveyComponent';

export default class SurveyList extends React.Component {
    constructor() {
        super();
        this.state = {
            surveys: SurveyStore.getAll(),
        };
    }

    render() {
        const { surveys } = this.state;
        const Surveys = surveys.map((item) => {
            return <SurveyRow key={item.id} survey={item} detail={this.props.showDetailFunction}/>
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