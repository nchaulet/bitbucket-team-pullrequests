import ApiClient from '../api';
import * as actionType from './type';

let client = new ApiClient();

const apiErrorHandler = (dispatch) => {
    return (error) => {

    };
};

export function login(pseudo, password) {
    client.setCredentials(pseudo, password);
    return {
        type: actionType.AUTH_LOGIN
    };
};

export function initRepositories() {
    return (dispatch, getState) => {
        client.getAllRepositoriesForTeam(getState().selectedTeam).then((repos) => {
            dispatch({
                type: actionType.REPOS_LOAD,
                payload: repos
            });
            dispatch(loadPullRequests());
        }, (error, qsdqsd) => {
            dispatch({
                type: 'LOGIN_ERROR',
                payload: null
            });
        });
    };
}

export function loadPullRequests() {
    return (dispatch, getState) => {
        var promises = getState().repositories.map((repo) => {
            return new Promise((resolve) => {
                client.fetchData(repo.links.pullrequests.href).then((pullrequests) => {
                    pullrequests = pullrequests.values;
                    let promises = pullrequests.map((pullRequest) => {
                        return client.fetchData(pullRequest.links.self.href);
                    });

                    Promise.all(promises).then((values) => {
                        resolve({
                            pullrequests: values,
                            repo: repo.full_name
                        });
                    });
                });
            });
        });

        Promise.all(promises).then((values) => {
            dispatch({
                type: 'LOAD_PULLREQUESTS',
                payload: values
            });
        });


    };
}

export function loadTeams() {
    return (dispatch) => {
        client.getTeams().then((teams) => {
            dispatch({
                type: actionType.TEAMS_LOAD,
                payload: teams
            });
        });
    };
}

export function selectTeam(team) {
    return {
        type: actionType.TEAM_SELECT,
        payload: team
    };
}
