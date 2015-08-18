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
        const statusClass = "bg-" + (approved != 0 ? 'success' :  (old == true ? 'danger' : 'info'));

        const pullRequestStyle = {
            padding: '10px',
            marginTop: 5,
            fontSize: '1.1em'
        };

        const pullRequestTitleStyle = {
            marginLeft: 40,

        };
        console.log(pr);
        return (
            <div className={statusClass} style={pullRequestStyle}>
                <span className="pull-right small">
                    {approved != 0 ? (
                        <div><i className="fa fa-thumbs-o-up"></i> ({approved})</div>
                    ) : null}
                </span>
                <img className="img-circle pull-left" style={avatarStyle} width="30" src={pr.author.links.avatar.href} />
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
