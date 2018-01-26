import dispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

export function createSurvey(survey){
    dispatcher.dispatch({
        type: "CREATE_SURVEY",
        survey,
    });
}

export function deleteSurvey(id){
    dispatcher.dispatch({
        type: "DELETE_SURVEY",
        id,
    });
}