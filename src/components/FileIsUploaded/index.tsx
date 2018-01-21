import * as React from 'react';
import TimeAgo from 'javascript-time-ago';

import * as ItemCss from '../../assets/item.css';
import * as FileCss from './index.css';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/fontawesome-free-regular';

const VisibilitySensor = require('react-visibility-sensor');

export type FileIsUploadedProps = {
    id: number
    user: {
        id: number,
        avatar: string,
        userName: string
    },
    filename: string,
    timestamp: Date,
    navigateToFile: (number) => any,
    navigateToUser: (number) => any
}

type State = {
    sensorActive: boolean,
    unread: boolean
}

export class FileIsUploaded extends React.Component<FileIsUploadedProps, State> {
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

    render() {
        const { user, filename, timestamp, navigateToFile, navigateToUser, id } = this.props;
        const timeAgo = new TimeAgo('en-US');
        const ago = timeAgo.format(timestamp);
        const key = 'file' + id;
        return <VisibilitySensor
            active={this.state.sensorActive}
            scrollCheck
            scrollThrottle={100}
            intervalDelay={8000}
            onChange={(isVisible) => this.onVisibilityChange(isVisible)}>

            <div key={key} className={`${ItemCss.item} ${FileCss.root}`} data-highlight={this.state.unread ? 'true' : null}>
                <div className={FileCss.icon}>
                    <FontAwesomeIcon icon={faFileExcel} />
                </div>
                <div className={FileCss.content}>
                    <div>File <a href="#" onClick={() => navigateToFile(id)}>{filename}</a> was uploaded</div>

                    <div className={FileCss.user} onClick={() => navigateToUser(user.id)}>
                        <img src={user.avatar} className={FileCss.avatar} />
                        <div className={FileCss.userName}><a href="#">{user.userName}</a></div>
                        <div className={FileCss.timestamp}>{ago}</div>
                    </div>
                </div>
            </div>
        </VisibilitySensor>

    }
}