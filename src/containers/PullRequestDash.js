import React from 'react';
import ReactDOM from 'react-dom';
import {initRepositories, loadPullRequests} from '../actions/index';
import {connect} from 'react-redux'
import RepoPullRequests from '../components/RepoPullRequests';
import Loader from './Loader';

@connect(
    (state) => {
        return {
            repositories: state.repositories,
            pullrequests: state.pullrequests
        };
    }
)
class PullRequestDash extends React.Component {
    componentWillMount() {

        if (this.props.repositories.length === 0) {
            this.props.dispatch(initRepositories());
        }

        this.ticker = setInterval(() => {
            this.props.dispatch(loadPullRequests());
        }, 60 * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.ticker);
    }

    render() {
        const pullrequests = this.props.pullrequests.toArray().filter((pullrequests) => {
            return pullrequests.count() > 0;
        }).map((pullrequests) => {
            pullrequests = pullrequests.toArray();
            return {
                repo: pullrequests[0].source.repository.full_name,
                pullrequests: pullrequests,
            };
        }).sort((a, b) => {
            return a.pullrequests.length < b.pullrequests.length;
        });

        return (
            <div className="container-fluid">
                <h2>PullRequests</h2>
                <hr/>
                {this.props.pullrequests.count() == 0 ? (<Loader />) : null}
                <div className="row">
                    {pullrequests.map((prs) => {
                        return <RepoPullRequests key={prs.repo} pullrequests={prs.pullrequests} repo={prs.repo}  />;
                    })}
                </div>
            </div>
        );


    }
}

export default PullRequestDash;
