import * as React from 'react';

import './style.css';

import Header from 'components/Header';
import Timeline from 'components/Timeline';

export const App: React.SFC<{}> = () => {
    return (
        <div>
            <Header />
            <Timeline />
        </div>
    );
}