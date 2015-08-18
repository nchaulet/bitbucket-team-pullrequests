import Immutable from 'immutable';
import * as actionType from '../actions/type';

export function bitbucketCredentials(state = null, action) {
    switch(action.type) {
        case actionType.AUTH_LOGIN:
            return true;
            break;
        case actionType.AUTH_ERROR:
            return null;
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
        case 'LOAD_PULLREQUESTS':
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
