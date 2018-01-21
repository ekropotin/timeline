import { getSelectedObject } from 'selectors';
import * as API from 'API';

export const Actions = {
    NAVIGATE_TO_HOME: 'NAVIGATE_TO_HOME',
    NAVIGATE_TO_USER: 'NAVIGATE_TO_USER',
    NAVIGATE_TO_PROJECT: 'NAVIGATE_TO_PROJECT',
    NAVIGATE_TO_FILE: 'NAVIGATE_TO_FILE',
    CLEAR_TIMELINE: 'CLEAR_TIMELINE',
    HANDLE_NEW_TIMELINE_EVENTS: 'HANDLE_NEW_TIMELINE_EVENTS',
    HANDLE_NEW_PENDING_EVENT: 'HANDLE_NEW_PENDING_EVENTS',
    LOAD_PENDING_EVENTS: 'LOAD_PENDING_EVENTS',
    SET_NO_MORE_EVENTS: 'SET_NO_MORE_EVENTS'
};

const _handleNewTimelineEvents = (events) => ({ type: Actions.HANDLE_NEW_TIMELINE_EVENTS, payload: events });

const _handleNewPendingEvent = (event) => ({ type: Actions.HANDLE_NEW_PENDING_EVENT, payload: event });

let subscription = null;
let apiObject = null;

export const initTimeline = () => (dispatch, getState) => {
    const selectedObject = getSelectedObject(getState());
    apiObject = selectedObject ? API[selectedObject.type](selectedObject.id) : API.timeline;
    apiObject.get().then((list) => {
        if (list.length < 10) {
            dispatch({ type: Actions.SET_NO_MORE_EVENTS });
        } else {
            dispatch(_handleNewTimelineEvents(list));
        }
        dispatch(_handleNewTimelineEvents(list));
        subscription = apiObject.subscribe((event) => {
            dispatch(_handleNewPendingEvent(event));
        });
    });
}

export const destroyTimeline = () => (dispatch) => {
    if (subscription) {
        subscription.unsubscribe();
    }
    dispatch({ type: Actions.CLEAR_TIMELINE });
}

export const loadMoreEvents = () => (dispatch, getState) => {
    const lastEvent = getState().timeline.currentEvents[getState().timeline.currentEvents.length - 1];
    if (lastEvent) {
        apiObject.get(lastEvent.date).then((list) => {
            if (list.length < 10) {
                dispatch({ type: Actions.SET_NO_MORE_EVENTS });
            } else {
                dispatch(_handleNewTimelineEvents(list));
            }
        });
    }
}

export const navigateToProject = (id: number) => (dispatch) => {
    dispatch(destroyTimeline());
    dispatch({ type: Actions.NAVIGATE_TO_PROJECT, payload: id });
    dispatch(initTimeline());
}

export const navigateToUser = (id: number) => (dispatch) => {
    dispatch(destroyTimeline());
    dispatch({ type: Actions.NAVIGATE_TO_USER, payload: id });
    dispatch(initTimeline());
}

export const navigateToHome = (id: number) => (dispatch) => {
    dispatch(destroyTimeline());
    dispatch({ type: Actions.NAVIGATE_TO_HOME });
    dispatch(initTimeline());
}

export const navigateToFile = (id: number) => (dispatch) => {
    dispatch(destroyTimeline());
    dispatch({ type: Actions.NAVIGATE_TO_FILE, payload: id });
    dispatch(initTimeline());
}

export const loadPendingEvents = () => ({ type: Actions.LOAD_PENDING_EVENTS });

