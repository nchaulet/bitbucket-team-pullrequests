import Immutable from 'immutable';
import * as actionType from '../actions/type';

const defaultCredentialsState = Immutable.Map({
    logged: false,
    error: null
});
export function bitbucketCredentials(state = defaultCredentialsState, action) {
    switch(action.type) {
        case actionType.AUTH_LOGIN:
            return state
                .set('logged', true);
            break;
        case actionType.AUTH_ERROR:
            return state
                .set('logged', false)
                .set('error', action.payload.error);
            break;
        default:
            return state;
            break;
    }
}

export function repositories(state = [], action) {
    switch(action.type){
        case actionType.REPOS_LOAD:
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export function teams(state = null, action) {
    switch(action.type){
        case actionType.TEAMS_LOAD:
            return Immutable.List(action.payload);
            break;
        default:
            return state;
            break;
    }
}

export function selectedTeam(state = null, action) {
    switch(action.type){
        case actionType.TEAM_SELECT:
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const defaultPullRequestsState = Immutable.Map({});
export function pullrequests(state = defaultPullRequestsState, action) {
    switch(action.type){
        case actionType.PULLREQUESTS_LOAD:
            action.payload.forEach((repoPr) => {
                pullrequests = Immutable.List(repoPr.pullrequests);
                state = state.set(repoPr.repo, pullrequests);
            });

            return state;
            break;
        default:
            return state;
            break;
    }
};
