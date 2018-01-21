import * as React from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

import { FileIsUploaded, FileIsUploadedProps } from '../FileIsUploaded';
import { Comment, CommentProps } from '../Comment';
import ShowNew from '../ShowNew';
import { getSelectedObject, getEventsList, hasMoreEvents } from 'selectors';
import { navigateToFile, navigateToUser, initTimeline, destroyTimeline, loadMoreEvents } from 'actions';
import * as API from 'API';

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
    navigateToFile: () => any,
    navigateToUser: () => any,
    initTimeline: () => any,
    destroyTimeline: () => any,
    loadMoreEvents: (Date) => any,
    hasMore: boolean
}

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
                    <ShowNew />
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.props.loadMoreEvents}
                        hasMore={this.props.hasMore}
                        loader={<Spinner size={SpinnerSize.large} label='Loading older events...' ariaLive='assertive' />}
                    >
                        {this.props.eventsList.map((event) => renderActivityItem(event))};
                    </InfiniteScroll>

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
    loadMoreEvents
};

const mapStateToProps = (state) => ({
    currentObject: getSelectedObject(state),
    eventsList: getEventsList(state),
    hasMore: hasMoreEvents(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);