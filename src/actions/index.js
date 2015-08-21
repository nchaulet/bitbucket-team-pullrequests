import ApiClient from '../api';
import * as actionType from './type';

let client = new ApiClient();

const apiErrorHandler = (dispatch) => {
    return (error) => {
        if (error.message == 'unauthorized') {
            dispatch({
                type: actionType.AUTH_ERROR,
                payload: {
                    error: 'Invalid login or password'
                }
            });
        }
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
        }, apiErrorHandler(dispatch));
    };
}

export function loadPullRequests() {
    return (dispatch, getState) => {
        var promises = getState().repositories.map((repo) => {
            return new Promise((resolve) => {
                client.fetchData(repo.links.pullrequests.href).then((pullrequests) => {
                    pullrequests = pullrequests.values;
                    let promises = pullrequests.map((pullRequest) => {
                        return client.fetchData(pullRequest.links.self.href).then((pullRequestDetails) => {
                            return client.fetchData(pullRequestDetails.links.comments.href).then((comments) => {
                                pullRequestDetails.commentsCount = comments.size;
                                return pullRequestDetails;
                            })
                        });
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
                type: actionType.PULLREQUESTS_LOAD,
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
        }, apiErrorHandler(dispatch));
    };
}

export function selectTeam(team) {
    return {
        type: actionType.TEAM_SELECT,
        payload: team
    };
}
