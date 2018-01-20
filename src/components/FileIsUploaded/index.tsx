import * as React from 'react';
import TimeAgo from 'javascript-time-ago';

import * as ItemCss from '../../assets/item.css';
import * as FileCss from './index.css';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/fontawesome-free-regular';

export interface FileIsUploadedProps {
  id: number,
  highlight?: boolean,
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

export class FileIsUploaded extends React.Component<FileIsUploadedProps> {
	public render() {
    const { user, filename, timestamp, navigateToFile, navigateToUser, id } = this.props;
    const timeAgo = new TimeAgo('en-US');
    const ago = timeAgo.format(timestamp);
    return (
      <div key="filecreated-{id}" className={`${ItemCss.item} ${FileCss.root}`} data-highlight={this.props.highlight ? 'true' : null}>
        <div className={FileCss.icon}>
          <FontAwesomeIcon icon={faFileExcel}/>
        </div>
        <div className={FileCss.content}>
          <div>File <a href="#" onClick={() => navigateToFile(id)}>{filename}</a> was uploaded</div>

          <div className={FileCss.user} onClick={() => navigateToUser(user.id)}>
            <img src={user.avatar} className={FileCss.avatar} />
            <div className={FileCss.userName}><a href="#">{user.userName}</a></div>
            <div className={FileCss.timestamp}>{ago}</div>
          </div>
        </div>
      </div>);
	}
}