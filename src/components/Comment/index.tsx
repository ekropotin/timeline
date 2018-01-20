import * as React from 'react';
import TimeAgo from 'javascript-time-ago';

import * as ItemCss from '../../assets/item.css';
import * as CommentCss from './index.css';

export interface CommentProps {
    id: number,
    highlight?: boolean,
    user: {
        id: number,
        avatar: string,
        userName: string,
    };

    file: {
        id: number,
        fileName: string,
    };

    timestamp: Date;
    text: string;
    navigateToFile: (number) => any;
    navigateToUser: (number) => any;
}

export class Comment extends React.Component<CommentProps> {
    public render() {
        const { id, user, file, text, timestamp, navigateToFile, navigateToUser } = this.props;

        const { avatar, userName } = user;
        const { fileName } = file;

        const timeAgo = new TimeAgo('en-US');
        const ago = timeAgo.format(timestamp);

        return (<div key="comment-{id}" className={`${ItemCss.item} ${CommentCss.root}`} data-highlight={this.props.highlight ? 'true' : null }>
            <img src={avatar} className={CommentCss.avatar} />
            <div>
                <a href="#" onClick={() => navigateToUser(user.id)}>{userName}</a> commented <a href="#" onClick={() => navigateToFile(file.id)}>{fileName}</a> {ago}
            </div>
            <div className={CommentCss.text}>
                {text}
            </div>
        </div>);
    }
}