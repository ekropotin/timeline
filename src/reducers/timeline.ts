import { Actions } from 'actions';
import { Projects } from 'API';

const emptyState = {
    pendingEvents: [],
    currentEvents: []
};
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [Actions.CLEAR_TIMELINE]: (state, action) => ({...emptyState}),

    [Actions.HANDLE_NEW_TIMELINE_EVENTS]: (state, action) => {
        const items = action.payload;
        const newArray = state.currentEvents.slice(0);
        newArray.push(...items);
        return { ...state, currentEvents: newArray };
    },

    [Actions.HANDLE_NEW_PENDING_EVENT]: (state, action) => {
        const newArray = state.pendingEvents.slice(0);
        newArray.unshift(action.payload);
        return { ...state, pendingEvents: newArray };
    },

    [Actions.LOAD_PENDING_EVENTS]: (state, action) => {
        const newArray = state.currentEvents.slice(0);
        newArray.unshift(...state.pendingEvents);
        return { pendingEvents: [], currentEvents: newArray };
    }
};

// ------------------------------------
// Reducer
// ------------------------------------

export default function(state = emptyState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
