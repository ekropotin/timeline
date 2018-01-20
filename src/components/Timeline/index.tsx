import * as React from 'react';
import { connect } from 'react-redux';

import { FileIsUploaded, FileIsUploadedProps } from '../FileIsUploaded';
import { Comment, CommentProps } from '../Comment';
import { ShowNew } from '../ShowNew';

import { getSelectedObject, getEventsList, getPendingEventsCount } from 'selectors';
import { navigateToFile, navigateToUser, initTimeline, destroyTimeline, loadPendingEvents } from 'actions';
import * as API from 'API';

import {
    Spinner,
    SpinnerSize
} from 'office-ui-fabric-react/lib/Spinner';

const getCommentProps = (comment, navigateToFile, navigateToUser): CommentProps => {
    const usr = API.Users.find((usr) => usr.id === comment.userId);
    const file = API.Files.find(file => file.id === comment.fileId);

    return {
        id: comment.id,
        user: {
            id: usr.id,
            avatar: usr.avatar,
            userName: usr.name
        },
        file: {
            id: comment.fileId,
            fileName: file.name
        },
        timestamp: comment.date,
        text: comment.text,
        navigateToFile: navigateToFile,
        navigateToUser: navigateToUser
    }
}

const getFileProps = (file, navigateToFile, navigateToUser): FileIsUploadedProps => {
    const usr = API.Users.find((usr) => usr.id === file.userId);

    return {
        id: file.id,
        user: {
            id: usr.id,
            avatar: usr.avatar,
            userName: usr.name
        },
        filename: file.name,
        timestamp: file.date,
        navigateToFile: navigateToFile,
        navigateToUser: navigateToUser
    }
}

type Props = {
    currentObject: any,
    eventsList: any[],
    pendingEventsCount: number,
    navigateToFile: () => any,
    navigateToUser: () => any,
    loadPendingEvents: () => any,
    initTimeline: () => any,
    destroyTimeline: () => any
}

//TODO: optimze: now timeline rerenders on pending events update
export class Timeline extends React.Component<Props> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.initTimeline();
    }

    componentWillUnmount() {
        this.props.destroyTimeline();
    }

    public render() {
        const renderActivityItem = (item) => {
            if (item.type === 'comment') {
                const itm = getCommentProps(item, this.props.navigateToFile, this.props.navigateToUser);
                return <Comment {...itm} />
            } else {
                const itm = getFileProps(item, this.props.navigateToFile, this.props.navigateToUser);
                return <FileIsUploaded {...itm} />
            }
        }

        return (
            <div>
                <h2>Timeline</h2>
                <div>
                    <ShowNew count={this.props.pendingEventsCount} load={this.props.loadPendingEvents}/>
                    {this.props.eventsList.map((event) => renderActivityItem(event))};
                </div>
            </div>

        )
    }
}

const mapDispatchToProps = {
    navigateToFile,
    navigateToUser,
    initTimeline,
    destroyTimeline,
    loadPendingEvents
};

const mapStateToProps = (state) => ({
    currentObject: getSelectedObject(state),
    eventsList: getEventsList(state),
    pendingEventsCount: getPendingEventsCount(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);