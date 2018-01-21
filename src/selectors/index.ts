import { createSelector } from 'reselect';

import { Users, Projects, Files } from 'API';
import { RootState } from 'store/state';

export const getEventsList = (state: RootState) => (state.timeline.currentEvents);

export const getPendingEventsCount = (state: RootState) => (state.timeline.pendingEvents.length);

export const hasMoreEvents = (state: RootState) => (state.timeline.hasMoreEvents);

export const getSelectedObject = createSelector(
    [(state: RootState) => (state.selectedObject)],

    (selectedObject) => {
        if (!selectedObject) {
            return null;
        }
        if (selectedObject.type === 'project') {
            const project = Projects.find(project => project.id === selectedObject.id);
            return { ...selectedObject, ...project };
        }
        if (selectedObject.type === 'user') {
            const user = Users.find(project => project.id === selectedObject.id);
            return { ...selectedObject, ...user };
        }
        //File
        const file = Files.find(file => file.id === selectedObject.id);
        const project = Projects.find((project) => project.id === file.projectId);
        const user = Users.find((user) => user.id === file.userId);
        return { ...selectedObject, ...file, project: project, user: user };
    }
);
