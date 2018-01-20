import { combineReducers } from 'redux';

import selectedObject from './selectedObject';

export const makeRootReducer = () => {
    return combineReducers(
        {
            selectedObject
        }
    );
};

export default makeRootReducer;
