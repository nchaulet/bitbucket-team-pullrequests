import React from 'react';
import moment from 'moment';
import PullRequestDate from './PullRequestDate';


class PullRequest extends React.Component {

    render() {
        const {pr} = this.props;

        const avatarStyle = {
            marginRight: 10
        };

        const approved = pr.participants.reduce((sum, participant) => {
            return sum + (participant.approved ? 1 : 0);
        }, 0);


        const old = moment(pr.updated_on).diff(new Date()) * -1  / 1000 / 60 / 60 > 20;
        const statusClass = "bg-" + (approved ? 'success': 'info');

        const pullRequestStyle = {
            padding: '10px',
            marginTop: 10,
            borderRadius: '4px',
            fontSize: '1.4em'
        };

        const pullRequestTitleStyle = {
            fontSize: '1.1em',
            marginLeft: 40,
        };

        return (
            <div className={statusClass} style={pullRequestStyle}>
                <span className="pull-right small">
                    {approved != 0 ? (
                        <div><i className="fa fa-thumbs-o-up"></i> {approved}</div>
                    ) : null}
                    {approved != 0 ? (
                        <br/>
                    ): null}
                    {pr.commentsCount != 0 ? (
                        <div><i className="fa fa-comment-o"></i> {pr.commentsCount}</div>
                    ) : null}
                </span>
                <img className="img-circle pull-left" style={avatarStyle} width="30"  src={pr.author.links.avatar.href} />
                <div style={pullRequestTitleStyle}>
                    <a href={pr.links.html.href} target="_blank">
                        {pr.title}
                        <br/>
                        <small>
                            {pr.source.repository.full_name}
                            <br/><i className="fa fa-clock-o"></i> <PullRequestDate date={pr.updated_on}/>
                        </small>
                    </a>
                </div>
                <div className="clearfix" />
            </div>
        );
    }
}

export default PullRequest;
