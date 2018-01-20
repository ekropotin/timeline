import { createSelector } from 'reselect';

import { Users, Projects } from 'API';
import { RootState } from 'store/state';

export const getSelectedObject = createSelector(
    [(state: RootState) => (state.selectedObject)], 
    
    (selectedObject) => { 
        if (!selectedObject) {
            return null;
        }
        if (selectedObject.type === 'project') {
            const project = Projects.find((project) => project.id === selectedObject.id);
            return { ...selectedObject, ...project };
        }
        if (selectedObject.type === 'user') {
            const user = Users.find((project) => project.id === selectedObject.id);
            return { ...selectedObject, ...user };
        }
        //File
        //TODO: replace mock
        const file = { id: 1, name: 'File1.ppt', userId: 1, projectId: Projects[0].id };
        const project = Projects.find((project) => project.id === file.projectId);
        const user = Users.find((user) => user.id === file.userId);
        return { ...selectedObject, ...file, project: project, user: user };
    }
);
