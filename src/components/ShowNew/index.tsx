import * as React from 'react';

import * as ItemCss from '../../assets/item.css';
import * as css from './style.css';

type ShowNewProps = {
    count: number,
    load: () => any
}

export class ShowNew extends React.Component<ShowNewProps> {
    public render() {
        if (!this.props.count) {
            return null;
        }
        return <div className={`${ItemCss.item} ${css.root}`}>
            <button className={css.button} onClick={() => this.props.load()}>Load new {this.props.count} activities</button>
            <div className={css.line} />
        </div>
    }
}