import { Actions } from 'actions';
import { Projects } from 'API';

const emptyState = null;
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [Actions.NAVIGATE_TO_HOME]: (state, action) => (null),

    [Actions.NAVIGATE_TO_USER]: (state, action) => ({ id: action.payload, type: 'user'}),

    [Actions.NAVIGATE_TO_PROJECT]: (state, action) => ({ id: action.payload, type: 'project' }),

    [Actions.NAVIGATE_TO_FILE]: (state, action) => ({ id: action.payload, type: 'file' })
};

// ------------------------------------
// Reducer
// ------------------------------------

export default function(state = emptyState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
