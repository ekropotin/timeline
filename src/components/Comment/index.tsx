import * as React from 'react';
import TimeAgo from 'javascript-time-ago';
const VisibilitySensor = require('react-visibility-sensor');

import * as ItemCss from '../../assets/item.css';
import * as CommentCss from './index.css';

export type CommentProps = {
    id: number,
    user: {
        id: number,
        avatar: string,
        userName: string,
    },

    file: {
        id: number,
        fileName: string,
    },

    timestamp: Date,
    text: string,
    navigateToFile: (number) => any,
    navigateToUser: (number) => any
}

type State = {
    sensorActive: boolean,
    unread: boolean
}

export class Comment extends React.Component<CommentProps, State> {
    constructor(props) {
        super(props);
        this.state = { sensorActive: true, unread: true };
    }

    onVisibilityChange(isVisible) {
        if (isVisible) {
            this.setState({ sensorActive: false });
            this['timer'] = setTimeout(() => {
                this.setState({ unread: false });
            }, 5000);
        }
    }

    componentWillUnmount() {
        if (this['timer']) {
            clearTimeout(this['timer']);
        }
    }

    public render() {
        const { id, user, file, text, timestamp, navigateToFile, navigateToUser } = this.props;

        const { avatar, userName } = user;
        const { fileName } = file;

        const timeAgo = new TimeAgo('en-US');
        const ago = timeAgo.format(timestamp);
        const key = 'comment' + id;
        return <VisibilitySensor
            active={this.state.sensorActive}
            scrollCheck
            scrollThrottle={100}
            intervalDelay={8000}
            onChange={(isVisible) => this.onVisibilityChange(isVisible)}>

            <div key={key} className={`${ItemCss.item} ${CommentCss.root}`} data-highlight={this.state.unread ? 'true' : null}>
                <img src={avatar} className={CommentCss.avatar} />
                <div>
                    <a href="#" onClick={() => navigateToUser(user.id)}>{userName}</a> commented <a href="#" onClick={() => navigateToFile(file.id)}>{fileName}</a> {ago}
                </div>
                <div className={CommentCss.text}>
                    {text}
                </div>
            </div>
        </VisibilitySensor>
    }
}