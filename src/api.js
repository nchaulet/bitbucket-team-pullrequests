function fetchJson(response) {
  if (!response.ok && response.status === 401) {
      throw new Error('unauthorized');
  }

  return response.json();
}

const fetch = window.fetch;

class ApiClient {
  constructor() {
    this.headers = {};
  }

  setCredentials(accessCode) {
    this.headers['Authorization'] = 'Bearer ' + accessCode;
  }

  getAllRepositoriesForTeam(team) {
    var checkNextPage = (results, data = []) => {
      data = data.concat(results.values);
      if (results.next) {
        return this.getRepositoriesForTeam(team, results.page + 1).then((results) => {
          return checkNextPage(results, data);
        });
      } else {
          return data;
      }
    };

    return this.getRepositoriesForTeam(team).then(checkNextPage);
  }

  getRepositoriesForTeam(team, page = 1) {
    return fetch('https://api.bitbucket.org/2.0/repositories/' + team + '?page=' + page, this._getOptions())
      .then(fetchJson)
      .then(function(data) {
          return data;
      });
  }

  fetchData(link) {
    return fetch(link, this._getOptions())
      .then(fetchJson)
      .then((data) => {
          return data;
      });
  }

  getTeams() {
    return fetch('https://api.bitbucket.org/2.0/teams/?role=member', this._getOptions())
      .then(fetchJson)
      .then(function(data) {
          return data.values;
      });
  }

  _getOptions() {
    return {
      headers: this.headers
    };
  }
  _getRepositories(page = 1) {

  }
};

export default ApiClient;



