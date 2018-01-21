import * as React from 'react';
import { connect } from 'react-redux';

import { getPendingEventsCount } from 'selectors';
import { loadPendingEvents } from 'actions';

import * as ItemCss from '../../assets/item.css';
import * as css from './style.css';

type ShowNewProps = {
    count: number,
    loadPendingEvents: () => any
}

export const ShowNew: React.SFC<ShowNewProps> = (props) => {
    if (!props.count) {
        return null;
    }
    return <div className={`${ItemCss.item} ${css.root}`}>
        <button className={css.button} onClick={() => props.loadPendingEvents()}>Load new {props.count} activities</button>
        <div className={css.line} />
    </div>
}

const mapStateToProps = (state) => ({
    count: getPendingEventsCount(state)
});

const mapDispatchToProps = {
    loadPendingEvents
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowNew);