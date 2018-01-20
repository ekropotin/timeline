export const Actions = {
    NAVIGATE_TO_HOME: 'NAVIGATE_TO_HOME',
    NAVIGATE_TO_USER: 'NAVIGATE_TO_USER',
    NAVIGATE_TO_PROJECT: 'NAVIGATE_TO_PROJECT',
    NAVIGATE_TO_FILE: 'NAVIGATE_TO_FILE'
};

export const navigateToProject = (id: number) => ({ type: Actions.NAVIGATE_TO_PROJECT, payload: id });

export const navigateToUser = (id: number) => ({ type: Actions.NAVIGATE_TO_USER, payload: id });

export const navigateToHome = () => ({ type: Actions.NAVIGATE_TO_HOME });

export const navigateToFile = (id: number) => ({ type: Actions.NAVIGATE_TO_FILE, payload: id });
