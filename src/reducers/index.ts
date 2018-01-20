import { combineReducers } from 'redux';

import selectedObject from './selectedObject';
import timeline from './timeline';

export const makeRootReducer = () => {
    return combineReducers(
        {
            selectedObject,
            timeline
        }
    );
};

export default makeRootReducer;
